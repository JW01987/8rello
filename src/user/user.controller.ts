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
import { userInfo } from 'os';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  createUser(@Body() user: CreateUserDto): Promise<{ message: string }> {
    return this.userService.signup(user);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<{ message: string }> {
    return this.userService.updateUser(id, user);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.softDeleteUser(id);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const result = await this.userService.findUserByEmail(req.user.email);
    const { password, ...userInfo } = result;
    return userInfo;
  }
}
