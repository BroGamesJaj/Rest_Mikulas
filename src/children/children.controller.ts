import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  async create(@Body() createChildDto: CreateChildDto) {
    return await this.childrenService.create(createChildDto);
  }

  @Get()
  async findAll() {
    return await this.childrenService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.childrenService.findOne(+id);
  }

  @Put(':id/toys/:toyid')
  async addToy(@Param('id') id: string, @Param('toyid') toyId: string){
    return await this.childrenService.addToy(+id,+toyId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    return await this.childrenService.update(+id, updateChildDto);
  }

  @Delete(':id/toys/:toyid')
  async removeToy(@Param('id') id: string,@Param('toyid') toyId: string){
    return await this.childrenService.removeToy(+id,+toyId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.childrenService.remove(+id);
  }
}
