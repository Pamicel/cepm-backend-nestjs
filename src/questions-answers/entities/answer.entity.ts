import { Expose } from 'class-transformer';
import { User } from '../../users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Question } from './question.entity';
import { SerializeOptions } from '@nestjs/common';

@Entity()
@SerializeOptions({ strategy: 'excludeAll' })
export class Answer {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ nullable: false })
  answer: string;

  @Column({ type: 'date' })
  dateCreated: string;

  @Expose()
  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @Expose()
  @ManyToOne(() => User, (user) => user.answers)
  user: User;

  @Expose()
  @RelationId((answer: Answer) => answer.user)
  userId: number;

  @BeforeInsert()
  addDateCreated() {
    if (!this.dateCreated) {
      this.dateCreated = new Date().toISOString();
    }
  }
}
