import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeathService } from '../death/death.service';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';
import { QuestionsAnswersController } from './questions-answers.controller';
import { QuestionsAnswersService } from './questions-answers.service';

describe('QuestionsAnswersController', () => {
  let controller: QuestionsAnswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsAnswersController],
      providers: [
        QuestionsAnswersService,
        {
          provide: CaslAbilityFactory,
          useValue: {},
        },
        {
          provide: DeathService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Question),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Answer),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<QuestionsAnswersController>(
      QuestionsAnswersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
