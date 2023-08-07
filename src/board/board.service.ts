import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto, UpdateBoardDto } from './dto';
import { BoardData } from './board.interface';
import { BoardEntity } from '../entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  //-- 서버 에러 --//
  private serverError(error: any): never {
    console.error(error);
    throw new HttpException(
      {
        message: `서버 오류가 발생했습니다. \n${error.message}`,
      },
      HttpStatus.BAD_GATEWAY,
    );
  }

  //-- 보드 생성 --//
  async create(
    createBoardDto: CreateBoardDto,
    user_id: number,
  ): Promise<{ message: string }> {
    const newBoard = this.boardRepository.create({
      user_id: user_id,
      ...createBoardDto,
    });
    try {
      await this.boardRepository.save(newBoard);
      return { message: '보드 생성에 성공했습니다.' };
    } catch (error) {
      this.serverError(error);
    }
  }

  //-- 보드 전체보기 --//
  async getAll(user_id: number): Promise<BoardData[]> {
    try {
      return await this.boardRepository.find({
        where: { user_id: user_id },
        select: {
          id: true,
          name: true,
          bg_color: true,
        },
      });
    } catch (error) {
      this.serverError(error);
    }
  }

  //-- 보드 상세보기 --//
  async getBoard(board_id: number): Promise<BoardData> {
    try {
      return await this.boardRepository.findOne({
        where: { id: board_id },
        select: {
          id: true,
          name: true,
          bg_color: true,
        },
      });
    } catch (error) {
      this.serverError(error);
    }
  }

  //-- 보드 수정하기 --//
  async update(
    updateBoardDto: UpdateBoardDto,
    board_id: number,
  ): Promise<{ message: string }> {
    const targetBoard = await this.boardRepository.findOne({
      where: { id: board_id },
    });

    if (!targetBoard) {
      throw new HttpException(
        { message: '보드를 찾을 수 없습니다.' },
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      Object.assign(targetBoard, updateBoardDto);
      await this.boardRepository.save(targetBoard);
      return { message: '보드 수정에 성공했습니다.' };
    } catch (error) {
      this.serverError(error);
    }
  }

  //-- 보드 삭제하기 --//
  async delete(board_id: number): Promise<{ message: string }> {
    const targetBoard = await this.boardRepository.findOne({
      where: { id: board_id },
    });
    try {
      await this.boardRepository.remove(targetBoard);
      return { message: '보드 삭제에 성공했습니다.' };
    } catch (error) {
      this.serverError(error);
    }
  }
}
