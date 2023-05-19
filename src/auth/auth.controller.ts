import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    return this.authService.validateUser(body.username, body.password);
  }

  @Post('refresh')
  async relogin(@Body() body) {
    return this.authService.generateNewToken(body);
  }
}