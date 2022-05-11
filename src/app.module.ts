import { Module } from '@nestjs/common';

import { AuthService } from './routes/auth/auth.service';
import { AuthController } from './routes/auth/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
