import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardEntity } from '../entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
