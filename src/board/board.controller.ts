import {
  Controller,
  Body,
  Param,
  Request,
  HttpException,
  HttpStatus,
  Post,
  Get,
  Patch,
  Delete,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto, UpdateBoardDto } from './dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // TO DO: (임시-삭제 필요) 유저 정보 가져오기
  private readonly user_id = 1;

  // 로그인 검증
  private validateLogin(userPayload) {
    if (!userPayload.user) {
      throw new HttpException(
        { message: '로그인이 필요한 기능입니다.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // request-user 가져오기
  AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  });

  //-- 보드 생성 --//
  @Post()
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    // @AuthUser() userPayload: any, => TODO :: user_id 필요한 부분 전체 반영해야 함
  ) {
    this.validateLogin(this.user_id);
    return await this.boardService.create(createBoardDto, this.user_id);
  }

  //-- 보드 전체보기 --//
  @Get()
  async getBoards() {
    return await this.boardService.getAll(this.user_id);
  }

  //-- 보드 상세보기 --//
  @Get('/:board_id')
  async getBoard(@Param('board_id') board_id: number) {
    return await this.boardService.getBoard(board_id);
  }

  //-- 보드 수정하기 --//
  @Patch('/:board_id')
  async updateBoard(
    @Param('board_id') board_id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return await this.boardService.update(
      this.user_id,
      board_id,
      updateBoardDto,
    );
  }

  //-- 보드 삭제하기 --//
  @Delete('/:board_id')
  async deleteBoard(@Param('board_id') board_id: number) {
    return await this.boardService.delete(this.user_id, board_id);
  }

  //-- 보드 권한유저 추가 --//
  @Post('/:board_id/invition')
  async invition(@Param('board_id') board_id: number) {
    return await this.boardService.createBoardAuthority(this.user_id, board_id);
  }
}
