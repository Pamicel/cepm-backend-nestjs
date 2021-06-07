import { SerializeOptions } from '@nestjs/common';
import { Expose } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './answer.entity';

@Entity()
@SerializeOptions({ strategy: 'excludeAll' })
export class Question {
  constructor(partial: Partial<Question>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  question: string;

  @Column({ type: 'date' })
  dateCreated: string;

  @Expose()
  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @Expose()
  @Column({ default: false })
  hide: boolean;

  @BeforeInsert()
  addDateCreated() {
    if (!this.dateCreated) {
      this.dateCreated = new Date().toISOString();
    }
  }
}
