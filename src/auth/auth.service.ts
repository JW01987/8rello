import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 🍉 로그인
  async login(_email: string, password: string) {
    const user = await this.userService.findUserByEmail(_email);
    if (!user) throw new UnauthorizedException();

    // 입력한 패스워드를 DB의 암호화된 패스워드와 비교
    const { password: hashedPassword, id, username, email } = user;
    const isPasswordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordsMatch) throw new UnauthorizedException();

    const payload = { id, username, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
