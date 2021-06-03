import { PartialType } from '@nestjs/swagger';
import { CreateStaffVoteProfileDto } from './create-staff-vote-profile.dto';

export class UpdateStaffVoteProfileDto extends PartialType(
  CreateStaffVoteProfileDto,
) {}
