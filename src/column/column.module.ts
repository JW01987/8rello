import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Columns } from '../entities/column.entity';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';

@Module({
  imports: [TypeOrmModule.forFeature([Columns])],
  controllers: [ColumnController],
  providers: [ColumnService],
})
export class ColumnModule {}
