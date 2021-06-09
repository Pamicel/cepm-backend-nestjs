import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StaffVoteProfile } from './entities/staff-vote-profile.entity';
import { StaffVoteProfileService } from './staff-vote-profile.service';

describe('StaffVoteProfileService', () => {
  let service: StaffVoteProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StaffVoteProfileService,
        {
          provide: getRepositoryToken(StaffVoteProfile),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<StaffVoteProfileService>(StaffVoteProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
