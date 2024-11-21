import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // console.log('process.env.SERVICE_PORT_GAMES', process.env.SERVICE_PORT_GAMES);
  await app.listen(Number(process.env.SERVICE_PORT_GAMES), () => {
    console.log(
      `Service GAMES start on ${process.env.SERVICE_PORT_GAMES} port`,
    );
  });
}
bootstrap();
