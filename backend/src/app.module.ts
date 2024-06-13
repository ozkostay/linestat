import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TennisModule } from './tennis/tennis.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [TennisModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
