import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Response } from 'express';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  public async createCard(
    @Body() createCardDto: CreateCardDto,
    @Query() Query,
    @Res() res: Response,
  ) {
    const { column_id } = Query;
    const { result, message } = await this.cardsService.createCard(
      createCardDto,
      column_id,
    );
    return res.json({ message, result });
  }

  @Get()
  public async findCardDetail(@Query() Query) {
    const { card_id } = Query;

    const { message, result } = await this.cardsService.findCardDetail(card_id);
    return { message, result };
  }

  @Patch()
  public async updateCard(
    @Query() Query,
    @Body() updateCardDto: UpdateCardDto,
    @Res() res: Response,
  ) {
    const { card_id } = Query;
    const { message, result } = await this.cardsService.updateCard(
      card_id,
      updateCardDto,
    );
    return res.json({ message, result });
  }

  @Patch()
  public async updateCardPosition(@Query() Query, @Res() res: Response) {
    const { card_id, position } = Query;
    const { message } = await this.cardsService.updateCardPosition(
      card_id,
      position,
    );
    return res.json({ message });
  }
}
