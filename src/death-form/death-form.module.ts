import { Module } from '@nestjs/common';
import { DeathFormService } from './death-form.service';
import { DeathFormController } from './death-form.controller';
import { Death } from '../death/entities/death.entity';
import { User } from '../users/entities/user.entity';
import { DeathForm } from './entities/death-form.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Death, User, DeathForm])],
  controllers: [DeathFormController],
  providers: [DeathFormService],
})
export class DeathFormModule {}
