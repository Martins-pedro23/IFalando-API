import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {bufferLogs: true});
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(
    {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      allowedHeaders: 'Content-Type, Accept',
    },
  );
  app.useLogger(app.get(Logger));
  await app.listen(process.env.PORT || 3000);
  console.log(`\n🚀 servidor rodando em: http://localhost:${process.env.PORT || 3000}\n`);
}
bootstrap();
