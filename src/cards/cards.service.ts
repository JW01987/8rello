import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from 'src/entities/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}
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
      card.position -= 1;
      const previousCard = await this.cardRepository.findOneBy({
        position: card.position,
      });
      previousCard.position += 1;
      this.cardRepository.save(previousCard);
    } else if (position === 'down') {
      card.position += 1;
      const nextCard = await this.cardRepository.findOneBy({
        position: card.position,
      });
      nextCard.position -= 1;
      this.cardRepository.save(nextCard);
    }
    this.cardRepository.save(card);
    return { message: '순서 변경에 성공했습니다.' };
  }
}
