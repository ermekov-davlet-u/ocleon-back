import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaterialListService } from './material-list.service';
import { CreateMaterialListDto } from './dto/create-material-list.dto';
import { UpdateMaterialListDto } from './dto/update-material-list.dto';

@Controller('material-list')
export class MaterialListController {
  constructor(private readonly materialListService: MaterialListService) {}

  @Post()
  create(@Body() createMaterialListDto: CreateMaterialListDto) {
    return this.materialListService.create(createMaterialListDto);
  }

  @Get()
  findAll() {
    return this.materialListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialListDto: UpdateMaterialListDto) {
    return this.materialListService.update(+id, updateMaterialListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialListService.remove(+id);
  }
}
