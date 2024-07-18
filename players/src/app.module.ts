import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Players } from './entities/players.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([Players])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
