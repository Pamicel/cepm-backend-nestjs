import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const mockRepository = {
    async find(): Promise<User[]> {
      return [
        {
          id: 12,
          email: 'hello',
        },
      ];
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
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

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return for findAll', async () => {
    // mock file for reuse
    const testUser: User = {
      id: 12,
      email: 'hello',
    };
    jest.spyOn(mockRepository, 'find').mockResolvedValueOnce([testUser]);
    expect(await service.findAll()).toEqual([testUser]);
  });
});
