import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as spdy from 'spdy';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  await app.listen(Number(process.env.SERVICE_PORT_TURNAMENTS), () => {
    console.log(
      `Service TURNAMENTS start on ${process.env.SERVICE_PORT_TURNAMENTS} port`,
    );
  });
}
bootstrap();
