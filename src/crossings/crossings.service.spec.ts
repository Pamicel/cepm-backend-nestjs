import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CrossingsService } from './crossings.service';
import { Crossing } from './entities/crossing.entity';

describe('CrossingsService', () => {
  let service: CrossingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrossingsService,
        { provide: getRepositoryToken(Crossing), useValue: {} },
      ],
    }).compile();

    service = module.get<CrossingsService>(CrossingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
