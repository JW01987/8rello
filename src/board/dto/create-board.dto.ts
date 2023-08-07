import { IsOptional, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly introduction: string;

  @IsOptional()
  @IsString()
  readonly bg_color: string;
}
