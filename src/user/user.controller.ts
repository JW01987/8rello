import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() user: CreateUserDto): Promise<{ message: string }> {
    return this.userService.signup(user);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() user: UpdateUserDto): Promise<{ message: string }> {
    return this.userService.updateUser(id, user);
  }
}
