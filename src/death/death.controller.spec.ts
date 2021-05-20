import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Crossing } from '../crossings/entities/crossing.entity';
import { CrossingsService } from '../crossings/crossings.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { DeathController } from './death.controller';
import { DeathService } from './death.service';
import { Death } from './entities/death.entity';

describe('DeathController', () => {
  let controller: DeathController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeathController],
      providers: [
        DeathService,
        UsersService,
        CrossingsService,
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
      ],
    }).compile();

    controller = module.get<DeathController>(DeathController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
