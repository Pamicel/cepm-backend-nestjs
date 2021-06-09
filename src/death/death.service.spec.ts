import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Crossing } from '../crossings/entities/crossing.entity';
import { CrossingsService } from '../crossings/crossings.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { DeathService } from './death.service';
import { Death } from './entities/death.entity';
import { DeathFormService } from '../death-form/death-form.service';
import { DeathForm } from '../death-form/entities/death-form.entity';

describe('DeathService', () => {
  let service: DeathService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeathService,
        UsersService,
        CrossingsService,
        {
          provide: DeathFormService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Death),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Crossing),
          useValue: {},
        },
        {
          provide: getRepositoryToken(DeathForm),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<DeathService>(DeathService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
