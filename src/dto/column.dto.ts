import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ColumnDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  boardId: number;
}

export class updateColumnDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class changeColPositionDto {
  @IsNumber()
  @IsNotEmpty()
  prev: number;

  @IsNumber()
  @IsNotEmpty()
  next: number;

  @IsNumber()
  @IsNotEmpty()
  id: number;
}
