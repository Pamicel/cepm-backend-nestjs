import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsAnswersService } from './questions-answers.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
// import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('qa')
export class QuestionsAnswersController {
  constructor(
    private readonly questionsAnswersService: QuestionsAnswersService,
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
  createAnswer(@Body() createAnswerDto: CreateAnswerDto) {
    return this.questionsAnswersService.createAnswer(createAnswerDto);
  }

  @Get('/answer')
  findAllAnswers() {
    return this.questionsAnswersService.findAllAnswers();
  }

  @Get('/answer/:id')
  findOneAnswer(@Param('id') id: string) {
    return this.questionsAnswersService.findOneAnswer(+id);
  }

  // @Patch('/answer/:id')
  // updateAnswer(
  //   @Param('id') id: string,
  //   @Body() updateAnswerDto: UpdateAnswerDto,
  // ) {
  //   return this.questionsAnswersService.updateAnswer(+id, updateAnswerDto);
  // }

  @Delete('/answer/:id')
  removeAnswer(@Param('id') id: string) {
    return this.questionsAnswersService.removeAnswer(+id);
  }
}
