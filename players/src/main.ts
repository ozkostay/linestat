import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.SERVICE_PORT_PLAYERS), () => {
    console.log(`Service PLAYERS start on ${process.env.SERVICE_PORT_PLAYERS} port`);
  });
}
bootstrap();
