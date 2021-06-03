import { Test, TestingModule } from '@nestjs/testing';
import { StaffVoteProfileController } from './staff-vote-profile.controller';
import { StaffVoteProfileService } from './staff-vote-profile.service';

describe('StaffVoteProfileController', () => {
  let controller: StaffVoteProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffVoteProfileController],
      providers: [StaffVoteProfileService],
    }).compile();

    controller = module.get<StaffVoteProfileController>(
      StaffVoteProfileController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
