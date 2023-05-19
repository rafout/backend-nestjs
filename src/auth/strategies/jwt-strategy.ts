import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtPayload } from './jwt-payload';
import { UsersService } from 'src/users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      secretOrKey: 'topSecret512',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }
  
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
