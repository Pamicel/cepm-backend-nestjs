import { Module } from '@nestjs/common';
import { QuestionsAnswersService } from './questions-answers.service';
import { QuestionsAnswersController } from './questions-answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { UsersModule } from '../users/users.module';
import { CaslModule } from '../casl/casl.module';
import { DeathModule } from '../death/death.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Answer]),
    UsersModule,
    DeathModule,
    CaslModule,
  ],
  controllers: [QuestionsAnswersController],
  providers: [QuestionsAnswersService],
  exports: [QuestionsAnswersService, TypeOrmModule],
})
export class QuestionsAnswersModule {}
