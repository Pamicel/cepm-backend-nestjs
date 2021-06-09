import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          // https://stackoverflow.com/questions/57099863
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getConnectionToken(),
          useValue: {},
        },
        {
          provide: CaslAbilityFactory,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
