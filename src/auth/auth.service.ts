import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
      const user = await this.usersService.findOneByUsername(username);
      if (!user) {
        throw new UnauthorizedException('Usuário ou Senha Inválidos');
      }
      if (bcrypt.compareSync(password, user.password)) {
        return await this.generateToken(user);
      }
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }

    async generateToken(payload: User) {
      const accessToken = this.jwtService.sign(
        { username: payload.username },
        {
          secret: 'topSecret512',
          expiresIn: '30s',
        },
      );

      const refreshToken = this.jwtService.sign(
        { username: payload.username },
        {
          secret: 'topSecret512refresh',
          expiresIn: '60s',
        },
      );

      return { access_token: accessToken, refresh_token: refreshToken };
    }

    async generateNewToken(body) {
      const payload: User = await this.validateRefreshToken(body);
      return this.generateToken(payload);
    }

    private async validateRefreshToken(body){
      const refreshToken = body.refresh_token;

      if (!refreshToken) {
        throw new NotFoundException('Usuário não encontrado');
      }

      const username = this.jwtService.decode(refreshToken)['username'];
      const user = await this.usersService.findOneByUsername(username);

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      try {
        this.jwtService.verify(refreshToken, {
          secret: 'topSecret512refresh',
        });
        return user;
      } catch (err) {
        if (err.name === 'JsonWebTokenError') {
          throw new UnauthorizedException('Assinatura Inválida');
        }
        if (err.name === 'TokenExpiredError') {
          throw new UnauthorizedException('Token Expirado');
        }
        throw new UnauthorizedException(err.name);
      }
    }
    
}
