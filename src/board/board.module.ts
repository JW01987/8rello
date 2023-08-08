import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardEntity } from '../entities/board.entity';
import { BoardAuthorityEntity } from 'src/entities/board_authority.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, BoardAuthorityEntity])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
