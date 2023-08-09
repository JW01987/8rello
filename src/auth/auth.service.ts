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

  async login(_email: string, password: string) {
    const user = await this.userService.findUserByEmail(_email);
    if (!user) throw new UnauthorizedException();

    const { password: hashedPassword, id, username, email } = user;
    const isPasswordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordsMatch) throw new UnauthorizedException();

    const payload = { id, username, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
