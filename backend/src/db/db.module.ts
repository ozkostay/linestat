import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Football } from 'src/football/entities/football.entity';
import { Tennis } from 'src/tennis/entities/tennis.entity';
import { Hockey } from 'src/hockey/entities/hockey.entity';
import { Basketball } from 'src/entities/tennis.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_URL,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'lines',
      entities: [Football, Tennis, Hockey, Basketball],
      synchronize: true,
      logging: false,
    }),
  ],
})
export class DbModuleLines {}
