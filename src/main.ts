import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidatorOptions } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const validatorOptions: ValidatorOptions = {
    forbidNonWhitelisted: true,
    enableDebugMessages: true
  }
  app.useGlobalPipes(new ValidationPipe(validatorOptions))
  await app.listen(3000);
}
bootstrap();
