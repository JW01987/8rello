import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findUserByEmail(email);
    const isPasswordsMatch = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordsMatch) {
      throw new HttpException('Incorrect password', 401);
    }

    const { password: _password, ...result } = user;

    // const payload = { username: result.username, id: result.id };
    // return{
    //   access_token: this.
    // }
  }
}
