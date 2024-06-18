import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turnament } from '../turnament/entities/turnament.entity';
import { Surface } from '../surface/entities/surface.entity';

@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: '192.168.15.250',
        port: 5432,
        username: 'linestatuser',
        password: 'linestatcrypt',
        database: 'tennis',
        entities: [Turnament, Surface],
        synchronize: true,
      }),
    ],
  })
export class DbModule {}


