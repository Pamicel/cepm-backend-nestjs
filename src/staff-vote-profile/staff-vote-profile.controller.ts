import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StaffVoteProfileService } from './staff-vote-profile.service';
import { CreateStaffVoteProfileDto } from './dto/create-staff-vote-profile.dto';
import { UpdateStaffVoteProfileDto } from './dto/update-staff-vote-profile.dto';

@Controller('staff-vote-profile')
export class StaffVoteProfileController {
  constructor(
    private readonly staffVoteProfileService: StaffVoteProfileService,
  ) {}

  @Post()
  create(@Body() createStaffVoteProfileDto: CreateStaffVoteProfileDto) {
    return this.staffVoteProfileService.create(createStaffVoteProfileDto);
  }

  @Get()
  findAll() {
    return this.staffVoteProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffVoteProfileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStaffVoteProfileDto: UpdateStaffVoteProfileDto,
  ) {
    return this.staffVoteProfileService.update(+id, updateStaffVoteProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffVoteProfileService.remove(+id);
  }
}
