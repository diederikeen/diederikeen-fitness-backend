import { Controller, Get, Post, Headers, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { IUser, IUserPayload } from './types';

import { PromiseResult } from '../../utils/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('user')
  getUser(@Headers('auth-token') token: string): PromiseResult<IUser> {
    return this.authService.getUser(token);
  }
  @Post('user')
  createUser(@Body() body: IUserPayload) {
    return this.authService.createUser(body);
  }
}
