import { Module } from '@nestjs/common';
import { TennisService } from './tennis.service';
import { TennisController } from './tennis.controller';
import { DbModule } from './db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([]), HttpModule],
  controllers: [TennisController],
  providers: [TennisService],
})
export class TennisModule {}
