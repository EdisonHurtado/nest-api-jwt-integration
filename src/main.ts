import 'reflect-metadata';

import 'dotenv/config';

import { NestFactory }
  from '@nestjs/core';

import { ValidationPipe }
  from '@nestjs/common';

import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';

import { AppModule }
  from './app.module';

async function bootstrap() {




  const app =
    await NestFactory.create(
      AppModule,
    );

  app.useGlobalPipes(

    new ValidationPipe(),
  );

  const config =
    new DocumentBuilder()

      .setTitle('JWT API')

      .setDescription(
        'Nest JWT Authentication',
      )

      .setVersion('1.0')

      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'access-token',
      )

      .build();

  const document =
    SwaggerModule.createDocument(
      app,
      config,
    );

  SwaggerModule.setup(
    'docs',
    app,
    document,
  );

  await app.listen(3000);

  console.log(
    'Swagger: http://localhost:3000/docs',
  );
}



bootstrap();