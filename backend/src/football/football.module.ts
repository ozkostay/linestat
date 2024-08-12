import { Module } from '@nestjs/common';
import { FootballService } from './football.service';
import { FootballController } from './football.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { DbModule } from './db/db.module';
import { Football } from './entities/football.entity';

@Module({
  
  imports: [DbModule, TypeOrmModule.forFeature([Football]), HttpModule],
  controllers: [FootballController],
  providers: [FootballService],
})
export class FootballModule {}
