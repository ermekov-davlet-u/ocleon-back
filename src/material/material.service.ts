import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { MaterialFile } from './entities/material-file.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Express } from 'express';
import { existsSync, unlinkSync } from 'fs';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly repo: Repository<Material>,

    @InjectRepository(MaterialFile)
    private readonly fileRepo: Repository<MaterialFile>,
  ) {}

  // ── Создание материала (с опциональными файлами) ─────────────────────────
  async create(
    dto: CreateMaterialDto,
    files?: Express.Multer.File[],
  ): Promise<Material> {
    const material = this.repo.create(dto);
    const saved = await this.repo.save(material);

    if (files && files.length > 0) {
      await this.attachFiles(saved, files);
    }

    return this.findOne(saved.id);
  }

  // ── Получить все материалы ────────────────────────────────────────────────
  findAll(): Promise<Material[]> {
    return this.repo.find({ relations: { files: true } });
  }

  // ── Получить один материал ────────────────────────────────────────────────
  async findOne(id: number): Promise<Material> {
    const material = await this.repo.findOne({
      where: { id },
      relations: { files: true },
    });
    if (!material) throw new NotFoundException(`Материал #${id} не найден`);
    return material;
  }

  // ── Обновить материал (с опциональными новыми файлами) ───────────────────
  async update(
    id: number,
    dto: UpdateMaterialDto,
    files?: Express.Multer.File[],
  ): Promise<Material> {
    const material = await this.findOne(id);
    Object.assign(material, dto);
    await this.repo.save(material);

    if (files && files.length > 0) {
      await this.attachFiles(material, files);
    }

    return this.findOne(id);
  }

  // ── Удалить конкретный файл материала ────────────────────────────────────
  async removeFile(materialId: number, fileId: number): Promise<void> {
    const file = await this.fileRepo.findOne({
      where: { id: fileId, material: { id: materialId } },
    });
    if (!file) throw new NotFoundException(`Файл #${fileId} не найден`);

    // Удаляем с диска
    if (existsSync(file.filePath)) {
      unlinkSync(file.filePath);
    }

    await this.fileRepo.remove(file);
  }

  // ── Удалить материал ─────────────────────────────────────────────────────
  async remove(id: number): Promise<void> {
    const material = await this.findOne(id);

    // Удаляем все файлы с диска
    for (const file of material.files ?? []) {
      if (existsSync(file.filePath)) {
        unlinkSync(file.filePath);
      }
    }

    await this.repo.remove(material);
  }

  // ── Приватный хелпер: привязать файлы к материалу ────────────────────────
  private async attachFiles(
    material: Material,
    files: Express.Multer.File[],
  ): Promise<void> {
    const fileEntities = files.map((f) =>
      this.fileRepo.create({
        material,
        filePath:     f.path,
        originalName: f.originalname,
        mimeType:     f.mimetype,
        size:         f.size,
      }),
    );
    await this.fileRepo.save(fileEntities);
  }
}
