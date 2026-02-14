import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-emlpoyee.dto';

export class UpdateEmlpoyeeDto extends PartialType(CreateEmployeeDto) {}
