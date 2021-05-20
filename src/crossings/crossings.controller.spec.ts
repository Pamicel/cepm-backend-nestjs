import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CrossingsController } from './crossings.controller';
import { CrossingsService } from './crossings.service';
import { Crossing } from './entities/crossing.entity';

describe('CrossingsController', () => {
  let controller: CrossingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrossingsController],
      providers: [
        CrossingsService,
        { provide: getRepositoryToken(Crossing), useValue: {} },
      ],
    }).compile();

    controller = module.get<CrossingsController>(CrossingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
