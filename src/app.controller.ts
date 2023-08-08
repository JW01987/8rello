import { Controller, Get, Render, Res } from '@nestjs/common';
import path from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() res) {
    res.sendFile('index.html', {
      root: 'client',
    });
  }
}
