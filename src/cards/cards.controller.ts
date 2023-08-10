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
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/card.dto';
import {
  UpdateCardDto,
  updateCardPositionDto,
  updateCommentDto,
} from './dto/update-card.dto';
import { Response, query } from 'express';
import { IRequest } from 'src/commons/interfaces/context';
import { retry } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  // 카드 생성
  @Post('create') // column_id 추가 필요
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

  //컬럼별 카드 불러오기
  @Get()
  public async showColumnCard(
    @Query('column_id') column_id: number,
    @Res() res: Response,
  ) {
    const { results, message } = await this.cardsService.showColumnCard(
      column_id,
    );
    return res.json({ message, results });
  }

  // 카드 상세 정보
  @Get('detail')
  public async findCardDetail(@Query() Query) {
    const { card_id } = Query;

    const { message, result } = await this.cardsService.findCardDetail(card_id);
    return { message, result };
  }

  //카드 내용 수정
  @Patch('detail')
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

  //카드 이동
  // @Patch('position')
  // public async updateCardPosition(@Query() Query, @Res() res: Response) {
  //   const { card_id, position } = Query;
  //   const { message } = await this.cardsService.updateCardPosition(
  //     card_id,
  //     position,
  //   );
  //   return res.json({ message });
  // }

  //카드 이동
  @Patch('position')
  public async updateCardPosition(
    @Body() body: updateCardPositionDto,
    @Query('card_id') card_id: number,
  ) {
    const { column_id, prevPosition, nextPosition } = body;
    const result = await this.cardsService.updateCardPosition(
      card_id,
      column_id,
      prevPosition,
      nextPosition,
    );
    return result;
  }

  //카드 댓글 작성
  @Post('comments')
  @UseGuards(AuthGuard)
  public async createCardComment(
    @Query() Query,
    @Req() req: IRequest,
    @Res() res: Response,
    @Body() body,
  ) {
    const user_id = req.user.id;
    const comment = body.comment;
    const { card_id } = Query;
    const { message, result } = await this.cardsService.createCardComment(
      card_id,
      user_id,
      comment,
    );

    return res.json({ message, result });
  }

  // 카드 댓글 조회
  @Get('comments')
  public async findCardComments(@Query('card_id') card_id: number) {
    const results = await this.cardsService.findCardComments(card_id);
    return results;
  }

  // 카드 댓글 삭제
  @Delete('comments')
  public async deleteCardComment(
    @Query('comment_id') comment_id: number,
    @Res() res: Response,
  ) {
    const { message } = await this.cardsService.deleteCardComment(comment_id);
    return res.json({ message });
  }

  //카드 댓글 수정
  @Patch('comments')
  async updateComment(
    @Body() data: updateCommentDto,
  ): Promise<{ message: string }> {
    return this.cardsService.updateComment(data);
  }

  // 카드 삭제
  @Delete()
  public async deleteCard(
    @Query('card_id') card_id: number,
    @Res() res: Response,
  ) {
    const { message } = await this.cardsService.deleteCard(card_id);
    return res.json({ message });
  }

  // 카드 멤버 조회
  @UseGuards(AuthGuard)
  @Get('/member/:card_id')
  public async getMembers(
    @Param('card_id') card_id: number,
    @Res() res: Response,
  ) {
    const { message, result } = await this.cardsService.getMembers(card_id);
    return res.json({ message, result });
  }

  // 카드 멤버 추가
  @UseGuards(AuthGuard)
  @Post('/member/:card_id')
  public async addMember(
    @Param('card_id') card_id: number,
    @Query('user_id') user_id: string,
    @Res() res: Response,
  ) {
    const { message } = await this.cardsService.addMember(card_id, user_id);
    return res.json({ message });
  }
}
