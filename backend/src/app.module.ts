import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TennisModule } from './tennis/tennis.module';

@Module({
  imports: [TennisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
