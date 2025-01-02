import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // await app.listen(13099);

  await app.listen(13099, () => {
    console.log(
      `Service GAMES start on 13099 port`,
    );
  });

}
bootstrap();
