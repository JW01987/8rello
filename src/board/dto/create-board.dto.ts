import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly introduction: string;

  @IsNotEmpty()
  readonly bg_color: string;
}
