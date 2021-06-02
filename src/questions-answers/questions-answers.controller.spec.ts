import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsAnswersController } from './questions-answers.controller';
import { QuestionsAnswersService } from './questions-answers.service';

describe('QuestionsAnswersController', () => {
  let controller: QuestionsAnswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsAnswersController],
      providers: [QuestionsAnswersService],
    }).compile();

    controller = module.get<QuestionsAnswersController>(
      QuestionsAnswersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
