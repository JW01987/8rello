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
    //   const _errors = { username: '유효하지 않은 사용자 입력입니다.' };
    //   throw new HttpException(
    //     { message: '입력 데이터 유효성 검사 실패', _errors },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    return await this.boardService.create(createBoardDto, user_id);
  }
}
