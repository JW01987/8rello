import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto';
import { BoardEntity } from './board.entity';

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
      name: createBoardDto.name,
      introduction: createBoardDto.introduction,
      bg_color: createBoardDto.bg_color,
    });

    return this.boardRepository.save(newBoard);
  }
}
