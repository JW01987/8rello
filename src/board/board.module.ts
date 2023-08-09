import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardEntity } from '../entities/board.entity';
import { BoardAuthorityEntity } from 'src/entities/board_authority.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardEntity, BoardAuthorityEntity, User]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
