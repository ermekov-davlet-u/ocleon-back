import {
  Controller, Post, Body, UploadedFile, UseInterceptors,
  Get, Patch, Param, Delete
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from "fs"; // 🔹 именно existsSync
import { extname } from 'path';
import { CuttingJobService } from './cutting-job.service';
import { CreateCuttingJobDto, PreviewCuttingJobDto } from './dto/create-cutting-job.dto';
import { UpdateCuttingJobDto } from './dto/update-cutting-job.dto';

// тип файла для Multer
type MulterFile = Express.Multer.File;

@Controller('cutting-jobs')
export class CuttingJobController {
  constructor(private readonly service: CuttingJobService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = './uploads';
        if (!existsSync(uploadPath)) mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `cutting-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  create(@Body() dto: CreateCuttingJobDto, @UploadedFile() file: MulterFile) {
    if (file) {
      console.log('Файл пришел:', file.path); // проверка
      dto.filePath = file.path; // путь сохраняем в базе
    }
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Post('/for-cutting')
  findOneByAll(@Body() dto: PreviewCuttingJobDto) {
    return this.service.findOneByAll(dto);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `cutting-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async update(
    @Param('id') id: number,
    @Body() body: any, // raw FormData fields
    @UploadedFile() file: MulterFile,
  ) {
    // собираем DTO вручную
    const dto: UpdateCuttingJobDto = {
      materialId: body.materialId ? Number(body.materialId) : undefined,
      cuttingTypeId: body.cuttingTypeId ? Number(body.cuttingTypeId) : undefined,
      deviceTypeId: body.deviceTypeId ? Number(body.deviceTypeId) : undefined,
      userId: body.userId ? Number(body.userId) : undefined,
      notes: body.notes,
      quantity: body.quantity ? Number(body.quantity) : undefined,
      filePath: file ? file.path : undefined,
    };

    return this.service.update(+id, dto);
  }


  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
