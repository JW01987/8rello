import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    const { password: hashedPassword, ...userInfo } = user;
    const isPasswordsMatch = await bcrypt.compare(password, hashedPassword);

    if (!user || !isPasswordsMatch) {
      throw new UnauthorizedException();
    }

    const payload = { id: userInfo.id, username: userInfo.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
