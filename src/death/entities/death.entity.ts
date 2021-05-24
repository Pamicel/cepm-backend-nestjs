import { SerializeOptions } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Crossing } from '../../crossings/entities/crossing.entity';
import { DeathForm } from '../../death-form/entities/death-form.entity';

@Entity()
@SerializeOptions({ strategy: 'excludeAll' })
export class Death {
  constructor(partial: Partial<Death>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ type: 'date' })
  dateCreated: string;

  @ManyToOne(() => User, (user) => user.deaths, { cascade: ['insert'] })
  user: User;

  @ManyToOne(() => Crossing, (crossing) => crossing.deaths)
  crossing: Crossing;

  @OneToOne(() => DeathForm, (deathForm) => deathForm.death)
  @JoinColumn()
  deathForm: DeathForm;
}
