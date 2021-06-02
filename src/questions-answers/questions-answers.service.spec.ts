import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsAnswersService } from './questions-answers.service';

describe('QuestionsAnswersService', () => {
  let service: QuestionsAnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsAnswersService],
    }).compile();

    service = module.get<QuestionsAnswersService>(QuestionsAnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
