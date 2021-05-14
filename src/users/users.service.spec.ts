import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const mockRepository = {
    async find(): Promise<User[]> {
      return [];
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          // https://stackoverflow.com/questions/57099863
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: getConnectionToken(),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return for findAll', async () => {
    // mock file for reuse
    const testUsers: User = new User({
      id: 12,
      email: 'hello',
      password: '',
    });
    jest.spyOn(mockRepository, 'find').mockResolvedValueOnce([testUsers]);
    expect(await service.findAll()).toEqual([testUsers]);
  });
});
