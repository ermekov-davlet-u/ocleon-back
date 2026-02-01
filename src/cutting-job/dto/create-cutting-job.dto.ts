import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateCuttingJobDto {
  @IsInt()
  materialId: number;

  @IsInt()
  cuttingTypeId: number;

  @IsInt()
  deviceTypeId: number;

  @IsInt()
  userId: number;

  @IsOptional()
  @IsString()
  filePath?: string; // сюда Multer запишет путь

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;
}


// dto/preview-cutting-job.dto.ts
export class PreviewCuttingJobDto {
  materialId: number;
  cuttingTypeId: number;
  deviceTypeId: number;
  quantity?: number;
}
