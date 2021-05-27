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
import { DeathGroup } from '../../death-group/entities/death-group.entity';

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

  @Expose()
  @ManyToOne(() => User, (user) => user.deaths, {
    cascade: ['insert'],
    eager: true,
  })
  user: User;

  @Expose()
  @ManyToOne(() => Crossing, (crossing) => crossing.deaths)
  crossing: Crossing;

  @Expose()
  @Column({ default: false })
  isSimulation: boolean;

  @Expose()
  @OneToOne(() => DeathForm, (deathForm) => deathForm.death, { eager: true })
  @JoinColumn()
  deathForm: DeathForm;

  @ManyToOne(() => DeathGroup, (group) => group.deaths)
  group: DeathGroup;
}
