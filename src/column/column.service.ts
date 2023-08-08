import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  changeColPositionDto,
  ColumnDto,
  updateColumnDto,
} from '../dto/column.dto';
import { Columns } from '../entities/column.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Columns) private columnsRepository: Repository<Columns>,
  ) {}

  async findAll(boardId: number) {
    return await this.columnsRepository
      .createQueryBuilder('column')
      .where('column.boardId = :boardId', { boardId })
      .orderBy('column.position', 'ASC');
  }

  async findOne(id: number) {
    return await this.columnsRepository.findOne({ where: { id } });
  }

  async lastPosition() {
    return await this.columnsRepository
      .createQueryBuilder('column')
      .orderBy('column.created_at', 'DESC')
      .select(['column.position'])
      .take(1)
      .getOne();
  }
  async create(data: ColumnDto) {
    const boardId = data.boardId;
    //보드가 존재하는지 확인하는 코드 추가 필요
    const found = await this.findAll(boardId);
    if (!found) {
      //칼럼이 없을 때
      const create = this.columnsRepository.create({
        ...data,
        position: 1000,
      });
      return await this.columnsRepository.save(create);
    }
    //칼럼이 있다면 마지막 포지션 값에서 +1000
    const lastPosition = (await this.lastPosition()).position;
    const create = this.columnsRepository.create({
      ...data,
      position: lastPosition + 1000,
    });
    return await this.columnsRepository.save(create);
  }

  async update(data: updateColumnDto) {
    const name = data.name;
    const id = data.id;
    return await this.columnsRepository
      .createQueryBuilder('column')
      .update()
      .set({ name })
      .where('column.id = :id', { id })
      .execute();
  }

  async delete(id: number) {
    await this.findOne(id);
    return await this.columnsRepository.delete({ id });
  }

  async changeIndex(data: changeColPositionDto) {
    const prev = await (await this.findOne(data.prev)).position;
    const next = await (await this.findOne(data.next)).position;
    const id = data.id;

    const position = Math.round((prev + next) / 2);
    return await this.columnsRepository
      .createQueryBuilder('column')
      .update()
      .set({ position })
      .where('column.id = :id', { id })
      .execute();
  }
}
