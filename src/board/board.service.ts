import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto';
import { BoardEntity } from '../entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  //-- 보드 생성 --//
  async create(createBoardDto: CreateBoardDto, user_id: number) {
    const newBoard = this.boardRepository.create({
      User_id: user_id,
      ...createBoardDto,
    });
    try {
      await this.boardRepository.save(newBoard);
      return { message: '보드 생성에 성공했습니다.' };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          message: `보드 생성중 오류가 발생했습니다. \n${error.message}`,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
