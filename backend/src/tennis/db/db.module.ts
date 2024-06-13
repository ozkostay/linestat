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


// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Users } from '../user/entities/user.entity';
// import { Photo } from 'src/photo/entities/photo.entity';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: 'postgres',
//       database: 'forNest',
//       entities: [Users, Photo],
//       synchronize: true,
//     }),
//   ],
// })
// export class DatabaseModule {}
