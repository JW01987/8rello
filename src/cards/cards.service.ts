import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from 'src/entities/card.entity';
import { Repository } from 'typeorm';
import { Card_comment } from 'src/entities/card-comment.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,

    @InjectRepository(Card_comment)
    private commentRepository: Repository<Card_comment>,
  ) {}

  // column_id 추가 필요
  public async createCard(createCardDto: CreateCardDto, column_id: number) {
    const { card_name, description, card_color, deadline } = createCardDto;
    const result = await this.cardRepository.save({
      card_name,
      description,
      card_color,
      deadline,
      column: { id: column_id },
    });
    return { result, message: '카드 생성에 성공했습니다.' };
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

  public async updateCardPosition(card_id: number, position: string) {
    const card = await this.cardRepository.findOneBy({ id: card_id });
    if (position === 'up') {
      if (card.position === 1) {
        throw new ForbiddenException('이미 최상단입니다');
      }
      const previousCard = await this.cardRepository.findOneBy({
        position: card.position - 1,
      });
      card.position -= 1;
      previousCard.position += 1;
      await this.cardRepository.save(previousCard);
    } else if (position === 'down') {
      const nextCard = await this.cardRepository.findOneBy({
        position: card.position + 1,
      });
      if (!nextCard) {
        throw new ForbiddenException('이미 마지막입니다');
      }
      card.position += 1;
      nextCard.position -= 1;
      await this.cardRepository.save(nextCard);
    }
    await this.cardRepository.save(card);
    return { message: '순서 변경에 성공했습니다.' };
  }

  public async createCardComment(card_id, user_id, comment) {
    const result = await this.commentRepository.save({
      comment,
      card: { id: card_id },
      user: { id: user_id },
    });
    return { message: '댓글이 작성되었습니다', result };
  }
}
