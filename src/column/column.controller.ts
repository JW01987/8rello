import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import {
  changeColPositionDto,
  ColumnDto,
  updateColumnDto,
} from '../dto/column.dto';
import { ColumnService } from './column.service';

@Controller('column')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  //보드에 속한 칼럼 모두 불러오기
  @UseGuards(AuthGuard)
  @Get(':id')
  async findAll(@Param('id') boardId: number): Promise<ColumnDto[]> {
    return await this.columnService.findAll(boardId);
  }

  //칼럼 만들기
  @UseGuards(AuthGuard)
  @Post()
  async createCol(
    @Body() data: ColumnDto,
  ): Promise<{ status: boolean; message: string }> {
    return await this.columnService.create(data);
  }

  //칼럼 수정하기
  @UseGuards(AuthGuard)
  @Patch()
  async updateCol(
    @Body() data: updateColumnDto,
  ): Promise<{ status: boolean; message: string }> {
    return await this.columnService.update(data);
  }

  //칼럼 삭제하기
  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteCol(
    @Param('id') id: number,
  ): Promise<{ status: boolean; message: string }> {
    return await this.columnService.delete(id);
  }

  //칼럼 위치 이동
  @UseGuards(AuthGuard)
  @Patch('/index')
  async changeIndex(
    @Body() data: changeColPositionDto,
  ): Promise<{ status: boolean; message: string }> {
    return await this.columnService.changeIndex(data);
  }
}
