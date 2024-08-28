import { Module } from '@nestjs/common';
import { HockeyService } from './hockey.service';
import { HockeyController } from './hockey.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Hockey } from './entities/hockey.entity';
import { LinesService } from './lines.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hockey]), HttpModule],
  controllers: [HockeyController],
  providers: [HockeyService, LinesService],
})
export class HockeyModule {}
