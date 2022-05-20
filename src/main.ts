import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  // Config
  dotenv.config({
    path: './.env.local',
  });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);

  // Connect to db
  mongoose.connect(process.env.DB_CONNECT, () => {
    console.log('connected to database');
  });
}

bootstrap();
