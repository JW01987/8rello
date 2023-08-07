import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Card } from '../entities/card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card_comment } from 'src/entities/card-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card]),
    TypeOrmModule.forFeature([Card_comment]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
