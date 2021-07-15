import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DeathGroupService } from './death-group.service';
import { CreateDeathGroupDto } from './dto/create-death-group.dto';
import { AddDeathsToGroupDto } from './dto/add-deaths-to-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequiredPermissionLevel } from 'src/auth/permission-level.decorator';
import { PermissionLevel } from 'src/auth/permission-level.enum';

@ApiTags('death-groups')
@Controller('death-group')
export class DeathGroupController {
  constructor(private readonly deathGroupService: DeathGroupService) {}

  @Post()
  @RequiredPermissionLevel(PermissionLevel.Staff)
  create(@Body() createDeathGroupDto: CreateDeathGroupDto) {
    return this.deathGroupService.create(createDeathGroupDto);
  }

  @Get()
  @RequiredPermissionLevel(PermissionLevel.Staff)
  findAll() {
    return this.deathGroupService.findAll();
  }

  @Get(':id')
  @RequiredPermissionLevel(PermissionLevel.Staff)
  findOne(@Param('id') id: string) {
    return this.deathGroupService.findOne(+id);
  }

  @Post(':id/add')
  @RequiredPermissionLevel(PermissionLevel.Staff)
  addDeaths(
    @Param('id') id: string,
    @Body() addDeathsToGroupDto: AddDeathsToGroupDto,
  ) {
    return this.deathGroupService.addDeaths(+id, addDeathsToGroupDto);
  }

  @Delete(':id')
  @RequiredPermissionLevel(PermissionLevel.Staff)
  remove(@Param('id') id: string) {
    return this.deathGroupService.remove(+id);
  }
}
