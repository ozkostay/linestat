import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Games } from './entities/games.entity';
import { DbModule } from './db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsService } from './results.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { FrontService } from './front/front.service';
import { FrontModule } from './front/front.module';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([Games]), HttpModule, FrontModule],
  controllers: [AppController],
  providers: [AppService, ResultsService, FrontService],
})
export class AppModule {}
