import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './card.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  card_name: string;
  description: string;
  card_color: string;
  deadline: Date;
}

export class updateCardPositionDto {
  @IsNotEmpty()
  @IsNumber()
  column_id: number;

  @IsNotEmpty()
  @IsNumber()
  prevPosition: number;

  @IsNotEmpty()
  @IsNumber()
  nextPosition: number;
}
