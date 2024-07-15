import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turnaments } from './entities/turnaments.entity';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([Turnaments])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
