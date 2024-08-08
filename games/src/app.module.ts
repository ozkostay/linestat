import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Games } from './entities/games.entity';
import { DbModule } from './db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsService } from './results.service';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([Games])],
  controllers: [AppController],
  providers: [AppService, ResultsService],
})
export class AppModule {}
