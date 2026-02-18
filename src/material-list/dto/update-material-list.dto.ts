import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialListDto } from './create-material-list.dto';

export class UpdateMaterialListDto extends PartialType(CreateMaterialListDto) {}
