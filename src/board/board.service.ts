import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto, UpdateBoardDto } from './dto';
import { BoardData } from './board.interface';
import { BoardEntity } from '../entities/board.entity';
import { User } from 'src/entities/user.entity';
import { BoardAuthorityEntity } from '../entities/board_authority.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,

    @InjectRepository(BoardAuthorityEntity)
    private readonly boardAuthorityRepository: Repository<BoardAuthorityEntity>,
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
    const targetBoards = await this.boardRepository.find({
      where: { user_id: user_id },
      select: {
        id: true,
        name: true,
        bg_color: true,
      },
      relations: ['user'],
    });

    if (!targetBoards.length) {
      throw new HttpException(
        { message: '보드를 찾을 수 없습니다.' },
        HttpStatus.NOT_FOUND,
      );
    }
    console.log(targetBoards);

    return targetBoards;
  }

  //-- 보드 상세보기 --//
  async getBoard(board_id: number): Promise<BoardData> {
    const targetBoard = await this.boardRepository.findOne({
      where: { id: board_id },
      select: {
        id: true,
        name: true,
        bg_color: true,
      },
    });

    if (!targetBoard) {
      throw new HttpException(
        { message: '보드를 찾을 수 없습니다.' },
        HttpStatus.NOT_FOUND,
      );
    }
    return targetBoard;
  }

  //-- 보드 수정하기 --//
  async update(
    user_id: number,
    board_id: number,
    updateBoardDto: UpdateBoardDto,
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

    if (targetBoard.user_id !== user_id) {
      throw new HttpException(
        { message: '수정할 권한이 없습니다.' },
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
  async delete(
    user_id: number,
    board_id: number,
  ): Promise<{ message: string }> {
    const targetBoard = await this.boardRepository.findOne({
      where: { id: board_id },
    });

    if (targetBoard.user_id !== user_id) {
      throw new HttpException(
        { message: '삭제할 권한이 없습니다.' },
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      await this.boardRepository.remove(targetBoard);
      return { message: '보드 삭제에 성공했습니다.' };
    } catch (error) {
      this.serverError(error);
    }
  }

  //-- 보드 권한유저 추가하기 --//
  async createBoardAuthority(
    user_id: number,
    board_id: number,
  ): Promise<{ message: string }> {
    const targetBoard = await this.boardRepository.findOne({
      where: { id: board_id },
    });

    if (targetBoard.user_id !== user_id) {
      throw new HttpException(
        { message: '권한 유저를 추가할 권한이 없습니다.' },
        HttpStatus.NOT_FOUND,
      );
    }

    const newBoardAuthority = this.boardAuthorityRepository.create({
      user_id,
      board_id,
    });

    try {
      await this.boardAuthorityRepository.save(newBoardAuthority);
      return { message: '보드 권한유저 추가에 성공했습니다.' };
    } catch (error) {
      this.serverError(error);
    }
  }
}
