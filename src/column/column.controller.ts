import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import {
  changeColPositionDto,
  ColumnDto,
  updateColumnDto,
} from '../dto/column.dto';
import { ColumnService } from './column.service';

@Controller('column')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  //@UseGuards(AuthGuard)
  @Post()
  async createCol(@Body() data: ColumnDto) {
    return await this.columnService.create(data);
  }

  //@UseGuards(AuthGuard)
  @Patch()
  async updateCol(@Body('name') data: updateColumnDto) {
    return await this.columnService.update(data);
  }

  //@UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteCol(@Param('id') id: number) {
    return await this.columnService.delete(id);
  }

  //@UseGuards(AuthGuard)
  @Patch('/index')
  async changeIndex(@Body() data: changeColPositionDto) {
    return await this.columnService.changeIndex(data);
  }
}
