import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Death } from 'src/death/entities/death.entity';

@Injectable()
export class QuestionsAnswersService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    private userService: UsersService,
  ) {}

  createQuestion(createQuestionDto: CreateQuestionDto) {
    const question = this.questionRepository.create(createQuestionDto);
    return this.questionRepository.save(question);
  }

  findAllQuestions() {
    return this.questionRepository.find();
  }

  findOneQuestion(id: number) {
    try {
      return this.questionRepository.findOneOrFail(id);
    } catch (error) {
      throw new HttpException('Question not fount', HttpStatus.NOT_FOUND);
    }
  }

  async updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.findOneQuestion(id);
    const updatedQuestion: Partial<Question> = {
      ...question,
      ...updateQuestionDto,
    };
    return this.questionRepository.save(updatedQuestion);
  }

  removeQuestion(id: number) {
    return `This action removes a #${id} questionsAnswers`;
  }

  async createAnswer(death: Death, questionId: number, answer: string) {
    const question = await this.findOneQuestion(questionId);
    const newAnswer = this.answerRepository.create({ answer, death, question });
    return this.answerRepository.save(newAnswer);
  }

  findAllAnswers() {
    return this.answerRepository.find();
  }

  async findAllAnswersForDeath(death: Death) {
    return this.answerRepository.find({ where: { death } });
  }

  async findAllAnswersForQuestion(question: Question) {
    return this.answerRepository.find({ where: { question } });
  }

  findOneAnswer(id: number) {
    try {
      return this.answerRepository.findOneOrFail(id);
    } catch (error) {
      throw new HttpException('Answer not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateAnswer(id: number, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.findOneAnswer(id);
    answer.answer = updateAnswerDto.answer;

    return this.answerRepository.save(answer);
  }

  removeAnswer(id: number) {
    return `This action removes a #${id} questionsAnswers`;
  }
}
