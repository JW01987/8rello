import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Card } from '../entities/card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
