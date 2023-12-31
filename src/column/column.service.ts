import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  //보드에 속한 모든 칼럼 가져오기
  async findAll(boardId: number) {
    const found = await this.columnsRepository
      .createQueryBuilder('column')
      .where('column.board = :boardId', { boardId })
      .orderBy('column.position', 'ASC')
      .getMany();
    return found;
  }

  //칼럼 하나 가져오기
  async findOne(id: number) {
    const found = await this.columnsRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException('칼럼을 찾을 수 없습니다');
    return found;
  }

  //마지막 칼럼의 위치 구하는 함수
  async lastPosition() {
    return await this.columnsRepository
      .createQueryBuilder('column')
      .orderBy('column.position', 'DESC')
      .select(['column.position'])
      .take(1)
      .getOne();
  }

  //칼럼 생성하기
  async create(data: ColumnDto) {
    const boardId = data.boardId;
    const found = await this.findAll(boardId);
    if (found.length === 0) {
      const create = this.columnsRepository.create({
        name: data.name,
        position: 1000,
        board: { id: boardId },
      });
      await this.columnsRepository.save(create);
      return { status: true, message: '칼럼 생성에 성공하였습니다' };
    }

    const lastPosition = await (await this.lastPosition()).position;
    const create = this.columnsRepository.create({
      name: data.name,
      position: lastPosition + 1000,
      board: { id: boardId },
    });
    await this.columnsRepository.save(create);
    return { status: true, message: '칼럼 생성에 성공하였습니다' };
  }

  //칼럼 수정하기
  async update(data: updateColumnDto) {
    const name = data.name;
    const id = data.id;
    try {
      await this.columnsRepository
        .createQueryBuilder()
        .update(Columns)
        .set({ name })
        .where('id = :id', { id })
        .execute();
      return { status: true, message: '칼럼 수정에 성공하였습니다' };
    } catch (err) {
      throw new InternalServerErrorException('칼럼 수정에 실패했습니다');
    }
  }

  //칼럼 삭제하기
  async delete(id: number) {
    await this.findOne(id);
    await this.columnsRepository.delete({ id });
    return { status: true, message: '칼럼이 삭제되었습니다' };
  }

  //칼럼 위치 이동
  async changeIndex(data: changeColPositionDto) {
    const id = data.id;

    if (data.prev === 0) {
      const next = await this.findOne(data.next);
      const position = Math.round(next.position / 2);
      await this.columnsRepository
        .createQueryBuilder()
        .update(Columns)
        .set({ position })
        .where('id = :id', { id })
        .execute();
      return { status: true, message: '컬럼 순서가 변경되었습니다' };
    }
    if (data.next === 0) {
      const prev = await this.findOne(data.prev);
      const position = prev.position + 1000;
      await this.columnsRepository
        .createQueryBuilder()
        .update(Columns)
        .set({ position })
        .where('id = :id', { id })
        .execute();
      return { status: true, message: '컬럼 순서가 변경되었습니다' };
    }

    const prev = await this.findOne(data.prev);
    const next = await this.findOne(data.next);
    const position = Math.round((prev.position + next.position) / 2);
    await this.columnsRepository
      .createQueryBuilder()
      .update(Columns)
      .set({ position })
      .where('id = :id', { id })
      .execute();
    return { status: true, message: '컬럼 순서가 변경되었습니다' };
  }
}
