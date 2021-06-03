import { Module } from '@nestjs/common';
import { StaffVoteProfileService } from './staff-vote-profile.service';
import { StaffVoteProfileController } from './staff-vote-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffVoteProfile } from './entities/staff-vote-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffVoteProfile])],
  controllers: [StaffVoteProfileController],
  providers: [StaffVoteProfileService],
})
export class StaffVoteProfileModule {}
