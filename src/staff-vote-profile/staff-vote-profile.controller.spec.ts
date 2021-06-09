import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StaffVoteProfile } from './entities/staff-vote-profile.entity';
import { StaffVoteProfileController } from './staff-vote-profile.controller';
import { StaffVoteProfileService } from './staff-vote-profile.service';

describe('StaffVoteProfileController', () => {
  let controller: StaffVoteProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffVoteProfileController],
      providers: [
        StaffVoteProfileService,
        {
          provide: getRepositoryToken(StaffVoteProfile),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<StaffVoteProfileController>(
      StaffVoteProfileController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
