import { Module } from '@nestjs/common';
import { FrontService } from './front.service';
import { FrontController } from './front.controller';
import { DbModule } from 'src/db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Games } from 'src/entities/games.entity';

@Module({
  // imports: [DbModule, TypeOrmModule.forFeature([Games]), HttpModule, FrontModule],
  imports: [DbModule, TypeOrmModule.forFeature([Games])],
  controllers: [FrontController],
  providers: [FrontService],
})
export class FrontModule {}
