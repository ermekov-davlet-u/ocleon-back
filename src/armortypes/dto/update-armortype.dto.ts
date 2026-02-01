import { PartialType } from '@nestjs/mapped-types';
import { CreateArmorTypeDto } from './create-armortype.dto';

export class UpdateArmortypeDto extends PartialType(CreateArmorTypeDto) {}
