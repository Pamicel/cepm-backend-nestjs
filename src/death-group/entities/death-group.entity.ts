import { Death } from '../../death/entities/death.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Crossing } from '../../crossings/entities/crossing.entity';

@Entity()
export class DeathGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Death, (death) => death.group, { eager: true })
  deaths: Death[];

  @ManyToOne(() => Crossing, (crossing) => crossing.groups)
  crossing: Crossing;
}
