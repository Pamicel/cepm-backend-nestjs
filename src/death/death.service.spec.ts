import { Test, TestingModule } from '@nestjs/testing';
import { DeathService } from './death.service';

describe('DeathService', () => {
  let service: DeathService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeathService],
    }).compile();

    service = module.get<DeathService>(DeathService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
