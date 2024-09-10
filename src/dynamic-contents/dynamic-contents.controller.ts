import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DynamicContentsService } from './dynamic-contents.service';
import { CreateDynamicContentDto } from './dto/create-dynamic-content.dto';
import { UpdateDynamicContentDto } from './dto/update-dynamic-content.dto';

@Controller('dynamic-contents')
export class DynamicContentsController {
  constructor(private readonly dynamicContentsService: DynamicContentsService) {}

  @Post()
  create(@Body() createDynamicContentDto: CreateDynamicContentDto) {
    return this.dynamicContentsService.create(createDynamicContentDto);
  }

  @Get()
  findAll() {
    return this.dynamicContentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dynamicContentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDynamicContentDto: UpdateDynamicContentDto) {
    return this.dynamicContentsService.update(+id, updateDynamicContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dynamicContentsService.remove(+id);
  }
}
