import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  //-- 보드 생성 --//
  @Post()
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    // @Request() req: CustomRequest,
  ) {
    // TO DO :: 유저 정보 가져오기
    // const userPayload = req.user;
    const user_id = 1; // 값 userPayload.user_id로 변경필요

    // if (userPayload.user) {
    //   throw new HttpException(
    //     { message: '로그인이 필요한 기능입니다.',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    return await this.boardService.create(createBoardDto, user_id);
  }
}
