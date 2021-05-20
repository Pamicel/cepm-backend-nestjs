import { Module } from '@nestjs/common';
import { DeathService } from './death.service';
import { DeathController } from './death.controller';

@Module({
  controllers: [DeathController],
  providers: [DeathService],
})
export class DeathModule {}
