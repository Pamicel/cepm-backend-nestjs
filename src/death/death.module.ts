import { Module } from '@nestjs/common';
import { DeathService } from './death.service';
import { DeathController } from './death.controller';
import { Death } from './entities/death.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CrossingsService } from '../crossings/crossings.service';
import { Crossing } from '../crossings/entities/crossing.entity';
import { DeathFormModule } from 'src/death-form/death-form.module';

@Module({
  imports: [TypeOrmModule.forFeature([Death, User, Crossing])],
  controllers: [DeathController],
  providers: [DeathService, UsersService, CrossingsService, DeathFormModule],
  exports: [DeathService, TypeOrmModule],
})
export class DeathModule {}
