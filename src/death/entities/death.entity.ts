import { SerializeOptions } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { User } from '../../users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Crossing } from '../../crossings/entities/crossing.entity';
import { DeathForm } from '../../death-form/entities/death-form.entity';
import { DeathGroup } from '../../death-group/entities/death-group.entity';
import { Answer } from '../../questions-answers/entities/answer.entity';
import { deathIdcWords } from '../id-words';

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
  @Column({ default: false })
  isSimulation: boolean;

  @Expose()
  @ManyToOne(() => User, (user) => user.deaths, {
    cascade: ['insert'],
    eager: true,
  })
  user: User;

  @Expose()
  @RelationId((death: Death) => death.user)
  userId: number;

  @Expose()
  @ManyToOne(() => Crossing, (crossing) => crossing.deaths)
  crossing: Crossing;

  @RelationId((death: Death) => death.crossing)
  crossingId: number;

  @Expose()
  @Column({ nullable: true })
  idc?: number;

  @Expose()
  @OneToMany(() => Answer, (answer) => answer.death)
  answers: Answer[];

  @Expose()
  @OneToOne(() => DeathForm, (deathForm) => deathForm.death, { eager: true })
  @JoinColumn()
  deathForm: DeathForm;

  @ManyToOne(() => DeathGroup, (group) => group.deaths)
  group: DeathGroup;

  @Expose()
  get idcWord() {
    return deathIdcWords[(this.idc - 1) % deathIdcWords.length];
  }

  @BeforeInsert()
  addDateCreated() {
    if (!this.dateCreated) {
      this.dateCreated = new Date().toISOString();
    }
  }
}
