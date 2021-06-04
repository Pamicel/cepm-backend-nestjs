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
import { PermissionLevel } from 'src/auth/permission-level.enum';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Controller('qa')
export class QuestionsAnswersController {
  constructor(
    private readonly questionsAnswersService: QuestionsAnswersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post('/question')
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsAnswersService.createQuestion(createQuestionDto);
  }

  @Get('/question')
  findAllQuestions() {
    return this.questionsAnswersService.findAllQuestions();
  }

  @Get('/question/:id')
  findOneQuestion(@Param('id') id: string) {
    return this.questionsAnswersService.findOneQuestion(+id);
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

    const ability = this.caslAbilityFactory.createForUser(user);
    const answer = new Answer();
    answer.userId = createAnswerDto.userId;

    if (!ability.can(Action.Create, answer)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return this.questionsAnswersService.createAnswer(createAnswerDto);
  }

  @Get('/answer')
  findAllAnswers(@Req() req, @Query('all') all: boolean) {
    const { user } = req;
    if (user.permissionLevel > PermissionLevel.Staff && all) {
      return this.questionsAnswersService.findAllAnswers();
    }
    return this.questionsAnswersService.findAllAnswersForUser(user.id);
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

    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Update, answer)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return this.questionsAnswersService.updateAnswer(+id, updateAnswerDto);
  }

  @Delete('/answer/:id')
  removeAnswer(@Param('id') id: string) {
    return this.questionsAnswersService.removeAnswer(+id);
  }
}
