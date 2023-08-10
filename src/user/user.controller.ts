import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // 🍉 회원가입
  @Post('/signup')
  createUser(@Body() user: CreateUserDto): Promise<{ message: string }> {
    return this.userService.signup(user);
  }

  // 🍉 닉네임 수정
  @Patch('/:id')
  updateUser(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<{ message: string }> {
    return this.userService.updateUser(id, user);
  }

  // 🍉 회원 탈퇴
  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.softDeleteUser(id);
  }

  // 🍉 유저 조회
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const result = await this.userService.findUserByEmail(req.user.email);
    const { password, ...userInfo } = result;
    return userInfo;
  }
}
