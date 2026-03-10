import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CuttingJob } from 'src/cutting-job/entities/cutting-job.entity';
import { Client } from 'src/client/entities/client.entity';
import { CuttingOrder, CuttingOrderStatus } from './entities/order.entity';
import { CreateCuttingOrderDto } from './dto/create-order.dto';
import { Discount, DiscountRule } from 'src/discount/entities/discount.entity';
import { ArmorType } from 'src/armortypes/entities/armortype.entity';
import { DeviceType } from 'src/devicetype/entities/devicetype.entity';
import { applyDiscount, isDiscountValid } from 'src/discount/discount.calculator';
import { ClientHistoryResponse } from './dto/client-history.dto';

@Injectable()
export class CuttingOrderService {
  constructor(
    @InjectRepository(CuttingOrder)
    private readonly orderRepo: Repository<CuttingOrder>,

    @InjectRepository(CuttingJob)
    private readonly jobRepo: Repository<CuttingJob>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,

    @InjectRepository(Discount)
    private readonly discountRepo: Repository<Discount>,

    @InjectRepository(ArmorType)
    private readonly armorTypeRepo: Repository<ArmorType>,

    @InjectRepository(DeviceType)
    private readonly deviceTypeRepo: Repository<DeviceType>,
  ) { }

  // ─────────────────────────────────────────────
  // Приватные хелперы
  // ─────────────────────────────────────────────

  private normalize(str: string): string {
    return str?.toString().trim().toUpperCase().replace(/\s+/g, ' ');
  }

  /** Находит и валидирует скидку */
  private async resolveDiscount(discountId?: number): Promise<Discount | null> {
    if (!discountId) return null;

    const discount = await this.discountRepo.findOne({
      where: { id: discountId },
    });

    if (!discount) throw new NotFoundException(`Скидка #${discountId} не найдена`);
    if (!isDiscountValid(discount)) {
      throw new BadRequestException(`Скидка "${discount.name}" не активна или истекла`);
    }

    return discount;
  }

  /** Автоматически подбирает скидку по бизнес-правилу. */
  private async resolveDiscountByRule(rule: DiscountRule): Promise<Discount | null> {
    const discount = await this.discountRepo.findOne({
      where: { rule, isActive: true },
    });
    return discount && isDiscountValid(discount) ? discount : null;
  }

  /** Считает finalAmount с учётом скидки */
  private calculateFinalAmount(
    totalAmount: number,
    discount: Discount | null,
    manualSumma?: number,
  ): { finalAmount: number; discountAmount: number } {
    // Если оператор вручную вбил сумму — приоритет
    if (manualSumma !== undefined && manualSumma !== null) {
      return { finalAmount: manualSumma, discountAmount: totalAmount - manualSumma };
    }

    if (!discount) {
      return { finalAmount: totalAmount, discountAmount: 0 };
    }

    const result = applyDiscount(totalAmount, discount);
    return { finalAmount: result.finalAmount, discountAmount: result.discountAmount };
  }

  private async findDiscountByName(name: string): Promise<Discount | null> {
    return await this.discountRepo.findOne({
      where: { name, isActive: true },
    });
  }

  async create(dto: any): Promise<CuttingOrder> {
    if (!dto.clientPhone) {
      throw new BadRequestException('Номер телефона клиента обязателен');
    }

    // 1. Клиент
    let client = await this.clientRepo.findOne({ where: { phone: dto.clientPhone } });
    if (!client) {
      client = await this.clientRepo.save(
        this.clientRepo.create({
          phone: dto.clientPhone,
          name: dto.clientName || 'Не указано',
          email: dto.clientEmail || 'Не указано',
        }),
      );
    }

    // 2. CuttingJob
    const job = await this.jobRepo.findOne({ where: { id: dto.cuttingJobId } });
    if (!job) throw new NotFoundException('CuttingJob не найден');

    const totalAmount = job.price * dto.quantity;

    // 3. Скидка — сначала ручная, потом по rule
    let discount: Discount | null = null;

    if (dto.discountId) {
      discount = await this.resolveDiscount(dto.discountId);
    } else if (dto.discountRule) {
      discount = await this.resolveDiscountByRule(dto.discountRule as DiscountRule);
    }
    console.log(dto.discountId, discount);


    // 4. Проверка гарантийной оклейки по истории клиента
    const warrantyDiscount = await this.discountRepo.findOne({
      where: { name: 'Гарантийная оклейка 365', isActive: true },
    });

    if (warrantyDiscount && !discount) {
      const previousOrders = await this.orderRepo.find({
        where: { client: { id: client.id } },
        relations: { discount: true },
        order: { createdAt: 'DESC' },
      });

      const hasUsedWarranty = previousOrders.some(
        o => o.discount?.name === 'Гарантийная оклейка 365',
      );

      const recentOrder = previousOrders.find(o => {
        const daysSince = (Date.now() - new Date(o.createdAt).getTime()) / 86400000;
        return daysSince <= 14 && o.status !== 'DEFECT';
      });

      if (!hasUsedWarranty && recentOrder) {
        discount = warrantyDiscount;
      }
    }

    console.log(dto.discountId, discount);

    // 5. Итоговая сумма
    const { finalAmount } = this.calculateFinalAmount(totalAmount, discount, dto.summa);

    // 6. Материал — ищем по materialId из DTO
    let material: any = null;
    if (dto.materialId) {
      material = await this.orderRepo.manager.findOne('Material', {
        where: { id: dto.materialId },
      });
    }

    // 7. Сохранение
    const order = this.orderRepo.create({
      cuttingJob: job,
      client,
      quantity: dto.quantity,
      totalAmount,
      finalAmount,
      material: material ?? undefined, // материал из DTO
      discount: discount ?? undefined,
      status: CuttingOrderStatus.NEW,
    });

    return this.orderRepo.save(order);
  }

  // ─────────────────────────────────────────────
  // Массовое создание (импорт)
  // ─────────────────────────────────────────────

  async createMany(dtos: any[]): Promise<CuttingOrder[]> {
    const savedOrders: CuttingOrder[] = [];

    for (const dto of dtos) {
      if (!dto.clientPhone) continue;

      const phone = String(dto.clientPhone).trim();

      let client = await this.clientRepo.findOne({ where: { phone } });
      if (!client) {
        client = await this.clientRepo.save(
          this.clientRepo.create({ phone, name: 'Не указано', email: 'Не указано' }),
        );
      }

      const allowedArmorTypes = ['ЭКР', 'КОРПУС', 'ЗАД', 'КРЫШКА', 'ТОРЦЫ', 'КАМЕР'];
      const armorTypes = [dto.armorType1, dto.armorType2]
        .map((a) => this.normalize(a))
        .filter((a) => allowedArmorTypes.includes(a));

      if (armorTypes.length === 0) continue;

      const pricePerOrder = armorTypes.length === 2 ? dto.price / 2 : dto.price;

      for (const armorTypeName of armorTypes) {
        const normalizedDevice = this.normalize(dto.deviceType);
        const normalizedArmor = this.normalize(armorTypeName);

        let job = await this.jobRepo.findOne({
          where: {
            deviceType: { name: normalizedDevice },
            armorType: { name: normalizedArmor },
          },
          relations: ['deviceType', 'armorType'],
        });

        if (!job) {
          let deviceType = await this.deviceTypeRepo.findOne({ where: { name: normalizedDevice } });
          if (!deviceType) {
            deviceType = await this.deviceTypeRepo.save(
              this.deviceTypeRepo.create({ name: normalizedDevice }),
            );
          }

          let armorType = await this.armorTypeRepo.findOne({ where: { name: normalizedArmor } });
          if (!armorType) {
            armorType = await this.armorTypeRepo.save(
              this.armorTypeRepo.create({ name: normalizedArmor }),
            );
          }

          job = await this.jobRepo.save(
            this.jobRepo.create({ deviceType, armorType, price: pricePerOrder }),
          );
        }

        if (!job.price) {
          job.price = pricePerOrder;
          await this.jobRepo.save(job);
        }

        const order = this.orderRepo.create({
          cuttingJob: job,
          client,
          quantity: 1,
          totalAmount: pricePerOrder,
          finalAmount: pricePerOrder,
          status: CuttingOrderStatus.DONE,
          createdAt: dto.createdAt || new Date(),
        });

        savedOrders.push(await this.orderRepo.save(order));
      }
    }

    return savedOrders;
  }

  // ─────────────────────────────────────────────
  // CRUD
  // ─────────────────────────────────────────────

  findAll() {
    return this.orderRepo.find({
      order: { createdAt: 'DESC' },
      take: 5000,
      relations: {
        client: true,
        cuttingJob: { deviceType: true, armorType: true },
        discount: true,
        material: true,
      },
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: { client: true, discount: true, cuttingJob: true, material: true },
    });
    if (!order) throw new NotFoundException('CuttingOrder не найден');
    return order;
  }

  async update(id: number, dto: any) {
    const order = await this.findOne(id);

    if (dto.cuttingJobId) {
      const job = await this.jobRepo.findOne({ where: { id: dto.cuttingJobId } });
      if (!job) throw new NotFoundException('CuttingJob не найден');
      order.cuttingJob = job;
    }

    if (dto.clientPhone) {
      let client = await this.clientRepo.findOne({ where: { phone: dto.clientPhone } });
      if (!client) {
        client = await this.clientRepo.save(
          this.clientRepo.create({
            phone: dto.clientPhone,
            name: dto.clientName || 'Не указано',
            email: dto.clientEmail,
          }),
        );
      }
      order.client = client;
    }

    if (dto.quantity !== undefined) order.quantity = dto.quantity;

    if (order.cuttingJob) {
      const totalAmount = order.cuttingJob.price * order.quantity;
      const { finalAmount } = this.calculateFinalAmount(totalAmount, order.discount ?? null);
      order.totalAmount = totalAmount;
      order.finalAmount = finalAmount;
    }

    if (dto.status) order.status = dto.status;

    return this.orderRepo.save(order);
  }

  async updateStatus(id: number, status: CuttingOrderStatus) {
    const order = await this.findOne(id);
    order.status = status;
    if (status === CuttingOrderStatus.IN_PROGRESS) order.startedAt = new Date();
    if (status === CuttingOrderStatus.DONE || status === CuttingOrderStatus.REWORK) {
      order.finishedAt = new Date();
    }
    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return this.orderRepo.remove(order);
  }

  // ── getClientHistory ─────────────────────────────────────────────────────────
  async getClientHistory(phone: string): Promise<any[]> {
    if (!phone || phone.trim() === '') {
      throw new BadRequestException('Номер телефона не может быть пустым');
    }

    const client = await this.clientRepo.findOne({ where: { phone } });

    if (!client) {
      throw new NotFoundException('Клиент не найден');
    }

    const orders = await this.orderRepo.find({
      where: { client: { id: client.id } },
      relations: {
        cuttingJob: {
          armorType: true,
          deviceType: true,
        },
        material: true,
        discount: true,
      },
      order: { createdAt: 'DESC' },
    });

    return orders.map(order => ({
      id: order.id,
      deviceType: order.cuttingJob?.deviceType?.name ?? '—',
      armorType: order.cuttingJob?.armorType?.name ?? '—',
      material: order.material?.name ?? '—',
      quantity: order.quantity,
      totalAmount: order.totalAmount,
      finalAmount: order.finalAmount,
      status: order.status,
      createdAt: order.createdAt,
      discount: order.discount ?? null,
      warrantyUsed: order.warrantyUsed ?? false,
      isWarrantyOrder: order.discount?.name === 'Гарантийная оклейка 365',
    }));
  }
}
