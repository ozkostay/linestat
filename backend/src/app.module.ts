import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TennisModule } from './tennis/tennis.module';
import { FootballModule } from './football/football.module';
import { DbModuleLines } from './db/db.module';
import { HockeyModule } from './hockey/hockey.module';
import { BasketballModule } from './basketball/basketball.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DbModuleLines, TennisModule, FootballModule, HockeyModule, BasketballModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
