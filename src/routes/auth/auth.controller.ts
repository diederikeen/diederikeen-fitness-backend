import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('user')
  getUser(): string {
    return this.authService.getUser();
  }
  @Post('user')
  postUser(): string {
    return this.authService.postUser();
  }
}
