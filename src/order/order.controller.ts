import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CreateCuttingOrderDto } from './dto/create-order.dto';
import { UpdateCuttingOrderDto } from './dto/update-order.dto';
import { CuttingOrder, CuttingOrderStatus } from './entities/order.entity';
import { CuttingOrderService } from './order.service';
import * as XLSX from 'xlsx';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';

@Controller('cutting-orders')
export class CuttingController {
  constructor(private readonly service: CuttingOrderService) { }



  @Post('excel-user')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = './uploads';
          if (!existsSync(uploadPath)) mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `order-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadExcel(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { success: false, message: 'Файл не загружен' };
    }

    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const rows: any[][] = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: null,
    });

    let currentDate: Date | null = null;
    const orders: any[] = [];
    function excelDateToJSDate(serial: number): Date {
      const utc_days = Math.floor(serial - 25569);
      const utc_value = utc_days * 86400;
      return new Date(utc_value * 1000);
    }
    for (const row of rows) {
      if (!row || row.length === 0) continue;

      // убираем пустые значения по краям
      const filteredRow = row.filter((v) => v !== null && v !== '');

      if (filteredRow.length === 0) continue;

      if (
        filteredRow.length === 1
      ) {
        const newDate = excelDateToJSDate(filteredRow[0]);
        if (!isNaN(newDate.getTime())) {
          currentDate = newDate;
        } else {
          console.warn('Неверная дата в Excel, оставляем предыдущую:', filteredRow[0]);
          // currentDate остаётся прежней
        }
        console.log(currentDate);
        continue;
      }

      // ищем телефон (первое число 9-12 цифр)
      const phone = filteredRow.find((v) => /^\d{9,12}$/.test(String(v)));

      // модель — первый текст после телефона
      const phoneIndex = filteredRow.indexOf(phone);
      const model = filteredRow[phoneIndex + 1];

      if (!model) continue;

      // последние колонка — цена
      const price = Number(filteredRow[filteredRow.length - 1]);
      if (!price) continue;

      // armorType1 и armorType2 — между моделью и ценой
      const armorColumns = filteredRow.slice(phoneIndex + 2, -1);

      const armorType1 = this.cleanArmorValue(armorColumns[0]);
      const armorType2 = this.cleanArmorValue(armorColumns[1]);

      orders.push({
        clientPhone: phone,
        deviceType: String(model).trim(),
        armorType1,
        armorType2,
        price,
        createdAt: currentDate,
      });
    }
    const result: any = await this.service.createMany(orders);

    return {
      success: true,
      count: result.length,
    };
  }

  private cleanArmorValue(value: any): string | null {
    if (!value) return null;

    let str = String(value).trim();

    // Нормализация X
    if (/^[xх]$/i.test(str)) return null;

    // Убираем ИСП / ИСПЛ
    str = str.replace(/испл?/gi, '');

    // Убираем даты 03.06.25 или 16.03.2025
    str = str.replace(/\d{2}\.\d{2}\.\d{2,4}/g, '');

    str = str.trim();

    if (!str || /^[xх]$/i.test(str)) return null;

    return str;
  }



  @Post()
  create(@Body() dto: CreateCuttingOrderDto) {
    return this.service.create(dto);
  }

  

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateCuttingOrderDto) {
    return this.service.update(+id, dto);
  }

  @Patch('/status-change/:id')
  changeStatus(@Param('id') id: number, @Body() dto: any) {
    console.log(id, dto);

    return this.service.updateStatus(+id, dto.status);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }

  @Get('client-history')
  async getClientHistory(@Query('phone') phone: string) {
    if (!phone) {
      throw new BadRequestException('Номер телефона обязателен для поиска');
    }
    return this.service.getClientHistory(phone);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }
}
