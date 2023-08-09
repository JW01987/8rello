import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
  @Get(':id')
  async findAll(@Param('id') boardId: number): Promise<ColumnDto[]> {
    return await this.columnService.findAll(boardId);
  }

  //@UseGuards(AuthGuard)
  @Post()
  async createCol(
    @Body() data: ColumnDto,
  ): Promise<{ status: boolean; message: string }> {
    return await this.columnService.create(data);
  }

  //@UseGuards(AuthGuard)
  @Patch()
  async updateCol(
    @Body() data: updateColumnDto,
  ): Promise<{ status: boolean; message: string }> {
    return await this.columnService.update(data);
  }

  //@UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteCol(
    @Param('id') id: number,
  ): Promise<{ status: boolean; message: string }> {
    return await this.columnService.delete(id);
  }

  //맨 앞이거나 맨 뒤라면 prev, next의 값을 0으로 주세요
  //@UseGuards(AuthGuard)
  @Patch('/index')
  async changeIndex(
    @Body() data: changeColPositionDto,
  ): Promise<{ status: boolean; message: string }> {
    return await this.columnService.changeIndex(data);
  }
}
