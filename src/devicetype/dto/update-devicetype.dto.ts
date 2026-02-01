import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceTypeDto } from './create-devicetype.dto';

export class UpdateDevicetypeDto extends PartialType(CreateDeviceTypeDto) {}
