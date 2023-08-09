import { Controller, Get, Render, Res } from '@nestjs/common';
import path from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  root(@Res() res: any) {
    res.sendFile('index.html', {
      root: 'client',
    });
  }

  // 보드 id 에 맞는 페이지로 이동
  @Get('boards/:id')
  showBoard(@Res() res: any) {
    res.sendFile('index.html', {
      root: 'client',
    });
  }
}
