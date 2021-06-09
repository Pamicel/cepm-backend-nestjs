import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QuestionsAnswersService } from './questions-answers.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Action, CaslAbilityFactory } from '../casl/casl-ability.factory';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { DeathService } from '../death/death.service';
import { Death } from '../death/entities/death.entity';
import { Question } from './entities/question.entity';
import { RequiredPermissionLevel } from '../auth/permission-level.decorator';
import { PermissionLevel } from '../auth/permission-level.enum';

@Controller('qa')
export class QuestionsAnswersController {
  constructor(
    private readonly questionsAnswersService: QuestionsAnswersService,
    private readonly deathService: DeathService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post('/question')
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsAnswersService.createQuestion(createQuestionDto);
  }

  @Get('/question')
  findAllQuestions(): Promise<Question[]> {
    return this.questionsAnswersService.findAllQuestions();
  }

  @Get('/question/:id')
  findOneQuestion(@Param('id') id: string): Promise<Question> {
    return this.questionsAnswersService.findOneQuestion(+id);
  }

  @Get('/question/:id/answer')
  @RequiredPermissionLevel(PermissionLevel.Staff)
  async findAllQuestionAnswers(@Param('id') id: string): Promise<Answer[]> {
    const question = await this.questionsAnswersService.findOneQuestion(+id);
    return this.questionsAnswersService.findAllAnswersForQuestion(question);
  }

  @Patch('/question/:id')
  updateQuestion(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsAnswersService.updateQuestion(+id, updateQuestionDto);
  }

  @Delete('/question/:id')
  removeQuestion(@Param('id') id: string) {
    return this.questionsAnswersService.removeQuestion(+id);
  }

  @Post('/answer')
  async createAnswer(@Body() createAnswerDto: CreateAnswerDto, @Req() req) {
    const { user } = req;

    const death = await this.deathService.findOne(createAnswerDto.deathId);
    const ability = this.caslAbilityFactory.createForUser(user);
    const answer = new Answer({ death });

    if (!ability.can(Action.Create, answer)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return this.questionsAnswersService.createAnswer(
      death,
      createAnswerDto.questionId,
      createAnswerDto.answer,
    );
  }

  @Get('/answer')
  async findAllAnswers(@Req() req, @Query('deathId') deathId?: number) {
    const { user } = req;
    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.can(Action.Read, Death) && !deathId) {
      return this.questionsAnswersService.findAllAnswers();
    }

    if (!deathId) {
      throw new HttpException(
        'required query parameter deathId',
        HttpStatus.BAD_REQUEST,
      );
    }

    const death = await this.deathService.findOne(deathId);

    if (!ability.can(Action.Read, death)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return this.questionsAnswersService.findAllAnswersForDeath(death);
  }

  @Get('/answer/:id')
  async findOneAnswer(@Param('id') id: string, @Req() req) {
    const { user } = req;
    const answer = await this.questionsAnswersService.findOneAnswer(+id);

    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Read, answer)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return answer;
  }

  @Patch('/answer/:id')
  async updateAnswer(
    @Param('id') id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
    @Req() req,
  ) {
    const { user } = req;
    const answer = await this.questionsAnswersService.findOneAnswer(+id);
    const death = await this.deathService.findOne(answer.deathId);
    answer.death = death;

    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Update, answer)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return this.questionsAnswersService.updateAnswer(+id, updateAnswerDto);
  }

  @Delete('/answer/:id')
  async removeAnswer(@Req() req, @Param('id') id: string) {
    const { user } = req;
    let answer, death;
    try {
      answer = await this.questionsAnswersService.findOneAnswer(+id);
      death = await this.deathService.findOne(answer.deathId);
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    // Permission to update the answer's parent death means permission to delete the answer.
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Update, death)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.questionsAnswersService.removeAnswer(+id);
  }
}
