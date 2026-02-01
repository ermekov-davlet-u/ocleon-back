import { PartialType } from '@nestjs/mapped-types';
import { CreateCuttingJobDto } from './create-cutting-job.dto';

export class UpdateCuttingJobDto extends PartialType(CreateCuttingJobDto) {}
