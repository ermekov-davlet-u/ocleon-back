import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialReceiptItemDto } from './create-material_receipt_item.dto';

export class UpdateMaterialReceiptItemDto extends PartialType(CreateMaterialReceiptItemDto) {}
