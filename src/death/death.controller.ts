import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeathService } from './death.service';
import { CreateDeathDto } from './dto/create-death.dto';
import { UpdateDeathDto } from './dto/update-death.dto';

@Controller('death')
export class DeathController {
  constructor(private readonly deathService: DeathService) {}

  @Post()
  create(@Body() createDeathDto: CreateDeathDto) {
    return this.deathService.create(createDeathDto);
  }

  @Get()
  findAll() {
    return this.deathService.findAll();
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
}
