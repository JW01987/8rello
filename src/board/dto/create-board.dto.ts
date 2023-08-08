import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly introduction: string;

  @IsNotEmpty()
  @IsString()
  readonly bg_color: string;
}
