import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCardDto } from './dto/card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from 'src/entities/card.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Card_comment } from 'src/entities/card-comment.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,

    @InjectRepository(Card_comment)
    private commentRepository: Repository<Card_comment>,
  ) {}

  public async createCard(createCardDto: CreateCardDto, column_id: number) {
    const { card_name, description, card_color, deadline } = createCardDto;
    const position = await this.getLastPosition();

    const result = await this.cardRepository.save({
      card_name,
      description,
      card_color,
      deadline,
      position: position + 1000,
      column: { id: column_id },
    });
    return { result, message: '카드 생성에 성공했습니다.' };
  }

  public async findAllCards() {
    const results = await this.cardRepository.find({
      order: { position: 'ASC' },
    });
    return { message: '카드목록 조회에 성공했습니다', results };
  }

  public async getLastPosition() {
    const card = await this.cardRepository.find({
      order: { position: 'DESC' },
      take: 1,
    });
    const position = card[0].position;
    return position;
  }

  public async findCardDetail(card_id: number) {
    const result = await this.cardRepository.findOneBy({ id: card_id });
    if (!result) {
      throw new NotFoundException('존재하지 않는 카드입니다.');
    }
    return { message: '카드 조회에 성공했습니다', result };
  }

  public async updateCard(card_id: number, updateCardDto: UpdateCardDto) {
    const { card_name, description, card_color, deadline } = updateCardDto;
    const card = await this.cardRepository.findOneBy({ id: card_id });
    if (card_name) {
      card.card_name = card_name;
    }
    if (description) {
      card.description = description;
    }
    if (card_color) {
      card.card_color = card_color;
    }
    if (deadline) {
      card.deadline = deadline;
    }

    const result = await this.cardRepository.save(card);
    return { message: '카드정보 수정에 성공했습니다.', result };
  }

  public async updateCardPosition(
    card_id: number,
    column_id: number,
    prevPosition: number,
    nextPosition: number,
  ) {
    const targetCard = await this.cardRepository.findOneBy({ id: card_id });
    if (
      nextPosition - prevPosition === 1 ||
      (!prevPosition && nextPosition === 1)
    ) {
      const cards = await this.cardRepository
        .createQueryBuilder('cards')
        .select()
        .where('cards.position >= :position', { position: nextPosition })
        .getMany();
      for await (let card of cards) {
        card.position = card.position + 1000;
        await this.cardRepository.save(card);
      }
      nextPosition = nextPosition + 1000;
      targetCard.position = Math.ceil((prevPosition + nextPosition) / 2);
      // targetCard.column = column_id;
      // await this.cardRepository.update({id:card_id}, {column:column_id})
      await this.cardRepository.save(targetCard);
      return targetCard;
    } else {
      targetCard.position = Math.ceil((prevPosition + nextPosition) / 2);
      await this.cardRepository.save(targetCard);
      return targetCard;
    }
  }

  public async createCardComment(card_id, user_id, comment) {
    const result = await this.commentRepository.save({
      comment,
      card: { id: card_id },
      user: { id: user_id },
    });
    return { message: '댓글이 작성되었습니다', result };
  }

  public async deleteCard(card_id) {
    await this.cardRepository.delete({ id: card_id });
    return { message: '카드가 삭제되었습니다' };
  }
}
