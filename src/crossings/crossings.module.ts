import { Module } from '@nestjs/common';
import { CrossingsService } from './crossings.service';
import { CrossingsController } from './crossings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crossing } from './entities/crossing.entity';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Crossing]), CaslModule],
  controllers: [CrossingsController],
  providers: [CrossingsService],
  exports: [CrossingsService, TypeOrmModule],
})
export class CrossingsModule {}
