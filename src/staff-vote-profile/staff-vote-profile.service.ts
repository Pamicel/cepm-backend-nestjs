import { Injectable } from '@nestjs/common';
import { CreateStaffVoteProfileDto } from './dto/create-staff-vote-profile.dto';
import { UpdateStaffVoteProfileDto } from './dto/update-staff-vote-profile.dto';

@Injectable()
export class StaffVoteProfileService {
  create(createStaffVoteProfileDto: CreateStaffVoteProfileDto) {
    return 'This action adds a new staffVoteProfile';
  }

  findAll() {
    return `This action returns all staffVoteProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staffVoteProfile`;
  }

  update(id: number, updateStaffVoteProfileDto: UpdateStaffVoteProfileDto) {
    return `This action updates a #${id} staffVoteProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} staffVoteProfile`;
  }
}
