import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CrossingsService } from '../crossings/crossings.service';
import { Crossing } from '../crossings/entities/crossing.entity';
import { DeathService } from '../death/death.service';
import { Death } from '../death/entities/death.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { DeathGroupController } from './death-group.controller';
import { DeathGroupService } from './death-group.service';
import { DeathGroup } from './entities/death-group.entity';

describe('DeathGroupController', () => {
  let controller: DeathGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeathGroupController],
      providers: [
        DeathGroupService,
        { provide: getRepositoryToken(DeathGroup), useValue: {} },
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

    controller = module.get<DeathGroupController>(DeathGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
