import { Module } from '@nestjs/common';
import { DeathGroupService } from './death-group.service';
import { DeathGroupController } from './death-group.controller';
import { DeathGroup } from './entities/death-group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeathModule } from '../death/death.module';
import { CrossingsModule } from '../crossings/crossings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeathGroup]),
    DeathModule,
    CrossingsModule,
  ],
  controllers: [DeathGroupController],
  providers: [DeathGroupService],
})
export class DeathGroupModule {}
