import { Module } from '@nestjs/common';
import { BasketballService } from './basketball.service';
import { BasketballController } from './basketball.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basketball } from 'src/entities/tennis.entity';
import { HttpModule } from '@nestjs/axios';
import { LinesService } from './lines.service';
import { TransformDate } from './transformDate';
import { ResultService } from './results.service';
import { AppService } from 'src/app.service';
import { AxiosService } from 'src/axios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Basketball]), HttpModule],
  controllers: [BasketballController],
  providers: [BasketballService, LinesService, TransformDate, ResultService, AppService, AxiosService]
})
export class BasketballModule {}
