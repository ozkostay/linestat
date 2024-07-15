import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.15.250',
      port: 5432,
      username: 'linestatuser',
      password: 'linestatcrypt',
      database: 'tennis',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class DbModule {}
