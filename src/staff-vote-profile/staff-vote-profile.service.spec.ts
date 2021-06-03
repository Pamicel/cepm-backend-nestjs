import { Test, TestingModule } from '@nestjs/testing';
import { StaffVoteProfileService } from './staff-vote-profile.service';

describe('StaffVoteProfileService', () => {
  let service: StaffVoteProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffVoteProfileService],
    }).compile();

    service = module.get<StaffVoteProfileService>(StaffVoteProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
