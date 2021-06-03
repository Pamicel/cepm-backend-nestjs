import { Module } from '@nestjs/common';
import { StaffVoteProfileService } from './staff-vote-profile.service';
import { StaffVoteProfileController } from './staff-vote-profile.controller';

@Module({
  controllers: [StaffVoteProfileController],
  providers: [StaffVoteProfileService],
})
export class StaffVoteProfileModule {}
