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
  UseGuards,
  Req,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto, UpdateBoardDto, InvitationUser } from './dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  //-- 보드 생성 --//
  @UseGuards(AuthGuard)
  @Post()
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @Req() request: any,
  ) {
    const user = request.user;
    return await this.boardService.create(createBoardDto, user.id);
  }

  //-- 보드 전체보기 --//
  @UseGuards(AuthGuard)
  @Get()
  async getBoards(@Req() request: any) {
    const user = request.user;
    return await this.boardService.getAll(user.id);
  }

  //-- 보드 상세보기 --//
  @UseGuards(AuthGuard)
  @Get('/:board_id')
  async getBoard(@Param('board_id') board_id: number) {
    return await this.boardService.getBoard(board_id);
  }

  //-- 보드 수정하기 --//
  @UseGuards(AuthGuard)
  @Patch('/:board_id')
  async updateBoard(
    @Param('board_id') board_id: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @Req() request: any,
  ) {
    const user = request.user;
    return await this.boardService.update(user.id, board_id, updateBoardDto);
  }

  //-- 보드 삭제하기 --//
  @UseGuards(AuthGuard)
  @Delete('/:board_id')
  async deleteBoard(@Param('board_id') board_id: number, @Req() request: any) {
    const user = request.user;
    return await this.boardService.delete(user.id, board_id);
  }

  //-- 보드 권한유저 추가 --//
  @UseGuards(AuthGuard)
  @Post('/invitation')
  async invitation(@Body() data: InvitationUser, @Req() request: any) {
    const user = request.user;
    return await this.boardService.createBoardAuthority(data, user);
  }
}
