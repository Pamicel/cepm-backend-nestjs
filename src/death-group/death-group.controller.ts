import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DeathGroupService } from './death-group.service';
import { CreateDeathGroupDto } from './dto/create-death-group.dto';
import { AddDeathsToGroupDto } from './dto/add-deaths-to-group.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('death-groups')
@Controller('death-group')
export class DeathGroupController {
  constructor(private readonly deathGroupService: DeathGroupService) {}

  @Post()
  create(@Body() createDeathGroupDto: CreateDeathGroupDto) {
    return this.deathGroupService.create(createDeathGroupDto);
  }

  @Get()
  findAll() {
    return this.deathGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deathGroupService.findOne(+id);
  }

  @Post(':id/add')
  addDeaths(
    @Param('id') id: string,
    @Body() addDeathsToGroupDto: AddDeathsToGroupDto,
  ) {
    return this.deathGroupService.addDeaths(+id, addDeathsToGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deathGroupService.remove(+id);
  }
}
