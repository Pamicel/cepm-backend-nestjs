import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
// import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

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

  async createAnswer(createAnswerDto: CreateAnswerDto) {
    await this.findOneQuestion(createAnswerDto.questionId);
    await this.userService.findOne(createAnswerDto.userId);
    const answer = this.answerRepository.create(createAnswerDto);
    return this.answerRepository.save(answer);
  }

  findAllAnswers() {
    return this.answerRepository.find();
  }

  findOneAnswer(id: number) {
    try {
      return this.answerRepository.findOneOrFail(id);
    } catch (error) {
      throw new HttpException('Answer not found', HttpStatus.NOT_FOUND);
    }
  }

  // updateAnswer(id: number, updateAnswerDto: UpdateAnswerDto) {
  //   return `This action updates a #${id} questionsAnswers`;
  // }

  removeAnswer(id: number) {
    return `This action removes a #${id} questionsAnswers`;
  }
}
