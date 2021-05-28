import { SerializeOptions } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { Death } from '../../death/entities/death.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeathGroup } from '../../death-group/entities/death-group.entity';

@Entity()
@SerializeOptions({ strategy: 'excludeAll' })
export class Crossing {
  constructor(partial: Partial<Crossing>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  duration: number;

  @Expose()
  @Column()
  audienceSize: number;

  @Expose()
  @Column({ type: 'date' })
  startDate: string;

  @Expose()
  @Column({ type: 'date' })
  dateCreated: string;

  @OneToMany(() => Death, (death) => death.crossing)
  deaths: Death[];

  @OneToMany(() => DeathGroup, (group) => group.crossing)
  groups: DeathGroup[];

  @Expose()
  get crossingNumber(): number {
    /**
     * This number represents (approximately)
     * the number of crossings between the "Bataille de la Marne"
     * (13th September 1914) and the first instalment of the play
     * (22nd December 2018), counting 33 crossings a day every day
     */
    const baseNumber = 1256839;
    const crossingId = this.id ?? 0;

    return baseNumber + crossingId;
  }

  @BeforeInsert()
  addDateCreated() {
    if (!this.dateCreated) {
      this.dateCreated = new Date().toISOString();
    }
  }
}
