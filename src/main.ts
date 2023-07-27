import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastyfyMultipart from '@fastify/multipart';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // ON CREE L'APPLICATION NESTJS
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // PERMET D'UPLOAD DES FICHIERS
  app.register(fastyfyMultipart);

  // ON RECUPERE LE PORT STOCKE DANS LE FICHIER .env
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  // ON LANCE L'APPLICATION
  await app.listen(port);
}

bootstrap();
