import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseIntPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialsService } from './material.service';

// ── Multer конфиг ────────────────────────────────────────────────────────────
const multerConfig = diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './uploads/materials';
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `material-${uniqueSuffix}${extname(file.originalname)}`);
  },
});

@Controller('materials')
export class MaterialsController {
  constructor(private readonly service: MaterialsService) {}

  // POST /materials — создать с файлами
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, { storage: multerConfig }), // до 10 файлов
  )
  create(
    @Body() dto: CreateMaterialDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.service.create(dto, files);
  }

  // GET /materials
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET /materials/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // PATCH /materials/:id — обновить + добавить новые файлы
  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('files', 10, { storage: multerConfig }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMaterialDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.service.update(id, dto, files);
  }

  // DELETE /materials/:id/files/:fileId — удалить конкретный файл
  @Delete(':id/files/:fileId')
  removeFile(
    @Param('id',     ParseIntPipe) id:     number,
    @Param('fileId', ParseIntPipe) fileId: number,
  ) {
    return this.service.removeFile(id, fileId);
  }

  // DELETE /materials/:id — удалить материал целиком
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
