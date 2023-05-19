import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategies/jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({})
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategy ]
})
export class UsersModule {}
