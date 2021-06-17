import { Death } from '../../death/entities/death.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DeathForm {
  constructor(partial: Partial<DeathForm>) {
    Object.assign(this, partial);
  }

  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstname?: string;

  @Column({ nullable: true })
  lastname?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ type: 'date', nullable: true })
  birthDate?: string;

  @Column({ nullable: true })
  birthPlace?: string;

  @Column({ nullable: true })
  afterLife?: string;

  @Column({ nullable: true })
  afterLifeMore?: string;

  @Column({ nullable: true })
  grievances?: boolean;

  @Column({ nullable: true })
  grievancesDetails?: string;

  @Column({ nullable: true })
  job?: string;

  @Column({ nullable: true })
  pet?: boolean;

  @Column({ nullable: true })
  petDetails?: string;

  @Column({ type: 'simple-array', nullable: true })
  importantPeopleRoles?: string[];

  @Column({ type: 'simple-array', nullable: true })
  importantPeopleNames?: string[];

  @Column({ nullable: true })
  crossingType?: string;

  @Column({ nullable: true })
  intimate?: string;

  @Column({ nullable: true })
  public?: string;

  @Column({ nullable: true })
  captcha?: string;

  @Column({ nullable: true })
  song?: string;

  @Column({ nullable: true })
  dream?: boolean;

  @Column({ nullable: true })
  dreamDetails?: string;

  @Column({ nullable: true })
  enemy?: boolean;

  @Column({ nullable: true })
  enemyDetails?: string;

  @Column({ nullable: true })
  remorse?: boolean;

  @Column({ nullable: true })
  remorseDetails?: string;

  @Column({ nullable: true })
  imageRights?: boolean;

  @Column({ nullable: true })
  iVoteFor?: string;

  @Column({ nullable: true })
  eraseMyData?: boolean;

  @Column({ type: 'date', nullable: true })
  crossingDate: string;

  @Column({ type: 'date', nullable: true })
  dateCreated?: string;

  @Column({ type: 'date', nullable: true })
  dateModified?: string;

  @Column({
    default: false,
  })
  filled?: boolean;

  @OneToOne(() => Death, (death) => death.deathForm)
  death: Death;

  @BeforeInsert()
  addDateCreated() {
    if (!this.dateCreated) {
      this.dateCreated = new Date().toISOString();
    }
  }

  @BeforeUpdate()
  changeDateModified() {
    if (!this.dateModified) {
      this.dateModified = new Date().toISOString();
    }
  }
}
