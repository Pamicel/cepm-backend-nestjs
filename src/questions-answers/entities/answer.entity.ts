import { Expose } from 'class-transformer';
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
import { Death } from '../../death/entities/death.entity';

@Entity()
@SerializeOptions({ strategy: 'excludeAll' })
export class Answer {
  constructor(partial: Partial<Answer>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ nullable: false })
  answer: string;

  @Column({ type: 'date' })
  dateCreated: string;

  @Expose()
  @ManyToOne(() => Question, (question) => question.answers, { eager: true })
  question: Question;

  @Expose()
  @RelationId((answer: Answer) => answer.question)
  questionId: number;

  @Expose()
  @ManyToOne(() => Death, (death) => death.answers)
  death: Death;

  @Expose()
  @RelationId((answer: Answer) => answer.death)
  deathId: number;

  @BeforeInsert()
  addDateCreated() {
    if (!this.dateCreated) {
      this.dateCreated = new Date().toISOString();
    }
  }
}
