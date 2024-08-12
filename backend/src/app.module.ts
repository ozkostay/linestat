import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TennisModule } from './tennis/tennis.module';
import { FootballModule } from './football/football.module';

@Module({
  imports: [TennisModule, FootballModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
