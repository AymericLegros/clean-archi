import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastyfyMultipart from '@fastify/multipart';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.register(fastyfyMultipart);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port);
}

bootstrap();
