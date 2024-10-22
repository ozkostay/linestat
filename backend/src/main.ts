import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.enableCors();
  // app.enableCors({
  //   origin: 'http//localhost:3000'
  // });

  await app.listen(Number(process.env.SERVICE_PORT_BACKEND), () => {
    console.log(`Service BACKEND start on ${process.env.SERVICE_PORT_BACKEND} port`);
  });
}
bootstrap();
