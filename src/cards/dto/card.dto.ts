import { IsNotEmpty } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  card_name: string;

  description: string;
  card_color: string;
  deadline: Date;
}
