import { Controller, Get } from '@nestjs/common';
import { StaffVoteProfileService } from './staff-vote-profile.service';

@Controller('staff-vote-profile')
export class StaffVoteProfileController {
  constructor(
    private readonly staffVoteProfileService: StaffVoteProfileService,
  ) {}
  @Get()
  findAll() {
    return this.staffVoteProfileService.findAll();
  }
}
