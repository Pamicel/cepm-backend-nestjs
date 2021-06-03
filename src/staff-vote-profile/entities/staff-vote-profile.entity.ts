import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StaffVoteProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  yearOfBirth: number;

  @Column({ type: 'date', nullable: true })
  dateOfDeath: string;

  @Column({ nullable: true })
  phrase: string;

  @Column({ nullable: true })
  careerDetails: string;

  get incomplete(): boolean {
    const complete =
      (this.dateOfBirth || this.yearOfBirth) && this.dateOfDeath && this.phrase;
    return !complete;
  }
}
