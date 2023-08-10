import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 🍉 로그인
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    // {"access_token": "eyJhbGciOiJI..."}
    res.cookie('access_token', result.access_token, { httpOnly: true });
    return res.status(HttpStatus.OK).json(result);
  }

  // 🍉 로그아웃
  @Post('logout')
  async logout(@Res() response: Response) {
    response.clearCookie('access_token');
    return response.status(200).json({ message: '로그아웃 성공' });
  }
}
