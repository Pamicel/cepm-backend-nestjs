import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';
import { QuestionsAnswersService } from './questions-answers.service';

describe('QuestionsAnswersService', () => {
  let service: QuestionsAnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsAnswersService,
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

    service = module.get<QuestionsAnswersService>(QuestionsAnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
