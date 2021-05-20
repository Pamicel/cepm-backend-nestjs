import { Module } from '@nestjs/common';
import { CrossingsService } from './crossings.service';
import { CrossingsController } from './crossings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crossing } from './entities/crossing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Crossing])],
  controllers: [CrossingsController],
  providers: [CrossingsService],
  exports: [CrossingsService, TypeOrmModule],
})
export class CrossingsModule {}
