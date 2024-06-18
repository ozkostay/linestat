import { Module } from '@nestjs/common';
import { SurfaceService } from './surface.service';
import { SurfaceController } from './surface.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Surface } from './entities/surface.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Surface])],
  controllers: [SurfaceController],
  providers: [SurfaceService],
})
export class SurfaceModule {}
