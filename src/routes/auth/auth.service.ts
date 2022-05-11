import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getUser(): string {
    return 'Im a user';
  }
  postUser(): string {
    return 'Posted a user';
  }
}
