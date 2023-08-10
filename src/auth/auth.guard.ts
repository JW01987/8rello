import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
// 가드는 CanActivate를 구현해야 한다.
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.access_token; // 로그인한 유저의 경우 token = {"access_token": "eyJhbGciOiJI..."}
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload; // request.user에 payload를 할당
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
