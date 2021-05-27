import { Module } from '@nestjs/common';
import { DeathService } from './death.service';
import { DeathController } from './death.controller';
import { Death } from './entities/death.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CrossingsService } from '../crossings/crossings.service';
import { Crossing } from '../crossings/entities/crossing.entity';
import { DeathForm } from 'src/death-form/entities/death-form.entity';
import { DeathFormService } from 'src/death-form/death-form.service';

@Module({
  imports: [TypeOrmModule.forFeature([Death, User, Crossing, DeathForm])],
  controllers: [DeathController],
  providers: [DeathService, UsersService, CrossingsService, DeathFormService],
  exports: [DeathService, TypeOrmModule],
})
export class DeathModule {}
