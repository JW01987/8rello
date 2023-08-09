import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InvitationUser {
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly boardId: number;
}
