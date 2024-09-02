import { Module } from '@nestjs/common';
import { BasketballService } from './basketball.service';
import { BasketballController } from './basketball.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basketball } from 'src/entities/tennis.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Basketball]), HttpModule],
  controllers: [BasketballController],
  providers: [BasketballService],
})
export class BasketballModule {}
