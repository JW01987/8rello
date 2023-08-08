import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  ParseFileOptions,
  Param,
  Delete,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Response } from 'express';
import { IRequest } from 'src/commons/interfaces/context';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post() // column_id 추가 필요
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

  @Patch('position')
  public async updateCardPosition(@Query() Query, @Res() res: Response) {
    const { card_id, position } = Query;
    const { message } = await this.cardsService.updateCardPosition(
      card_id,
      position,
    );
    return res.json({ message });
  }

  // @Patch('position')
  // public async updateCardPosition() {
  //   const result = await this.cardsService.updateCardPosition2(
  //     card_id,
  //     prev,
  //     next,
  //   );
  //   return result;
  // }

  @Post('comments')
  public async createCardComment(
    @Query() Query,
    @Req() req: IRequest,
    @Res() res: Response,
    @Body('comment') comment,
  ) {
    const user_id = req.user.id;
    const { card_id } = Query;
    const { message, result } = await this.cardsService.createCardComment(
      card_id,
      user_id,
      comment,
    );

    return res.json({ message, result });
  }

  @Delete()
  public async deleteCard(
    @Query('card_id') card_id: number,
    @Res() res: Response,
  ) {
    const { message } = await this.cardsService.deleteCard(card_id);
    return res.json({ message });
  }

  @Get('aaaa')
  public async test() {
    const result = await this.cardsService.getLastPosition();
    return result;
  }
}
