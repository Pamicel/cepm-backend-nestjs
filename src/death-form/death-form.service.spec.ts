import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeathFormService } from './death-form.service';
import { DeathForm } from './entities/death-form.entity';

describe('DeathFormService', () => {
  let service: DeathFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeathFormService,
        { provide: getRepositoryToken(DeathForm), useValue: {} },
      ],
    }).compile();

    service = module.get<DeathFormService>(DeathFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
