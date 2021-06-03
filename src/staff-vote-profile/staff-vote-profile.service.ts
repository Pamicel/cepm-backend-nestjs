import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffVoteProfile } from './entities/staff-vote-profile.entity';

@Injectable()
export class StaffVoteProfileService {
  constructor(
    @InjectRepository(StaffVoteProfile)
    private staffvoteprofileRepository: Repository<StaffVoteProfile>,
  ) {}
  findAll() {
    return this.staffvoteprofileRepository.find();
  }
}
