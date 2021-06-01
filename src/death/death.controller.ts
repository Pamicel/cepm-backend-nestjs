import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequiredPermissionLevel } from '../auth/permission-level.decorator';
import { PermissionLevel } from '../auth/permission-level.enum';
import { UpdateDeathFormDto } from '../death-form/dto/update-death-form.dto';
import { CreateDeathFormDto } from '../death-form/dto/create-death-form.dto';
import { DeathService } from './death.service';
import { CreateDeathDto } from './dto/create-death.dto';
import { UpdateDeathDto } from './dto/update-death.dto';
import { deathIdcWords } from './id-words';

@ApiTags('deaths')
@Controller('death')
export class DeathController {
  constructor(private readonly deathService: DeathService) {}

  @Post()
  create(@Body() createDeathDto: CreateDeathDto) {
    return this.deathService.create(createDeathDto);
  }

  @Get()
  findAll(
    @Query('crossing') crossingId: number,
    @Query('user') userId: number,
  ) {
    if (crossingId) {
      return this.deathService.findByCrossing(crossingId);
    } else if (userId) {
      return this.deathService.findByUser(userId);
    }
    return this.deathService.findAll();
  }

  @RequiredPermissionLevel(PermissionLevel.Staff)
  @Get('idc-words')
  idWords(): string[] {
    return deathIdcWords;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deathService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeathDto: UpdateDeathDto) {
    return this.deathService.update(+id, updateDeathDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deathService.remove(+id);
  }

  @Post('form')
  createFirstForm(@Req() req, @Body() createDeathFormDto: CreateDeathFormDto) {
    const { user } = req;
    const userId = user.id;
    return this.deathService.createFirstForm(userId, createDeathFormDto);
  }

  @Post(':id/form')
  createForm(
    @Param('id') id: string,
    @Body() createDeathFormDto: CreateDeathFormDto,
  ) {
    return this.deathService.createForm(+id, createDeathFormDto);
  }

  @Patch(':id/form')
  updateForm(
    @Param('id') id: string,
    @Body() updateDeathFormDto: UpdateDeathFormDto,
  ) {
    return this.deathService.updateForm(+id, updateDeathFormDto);
  }
}
