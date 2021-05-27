import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeathFormService } from './death-form.service';
import { CreateDeathFormDto } from './dto/create-death-form.dto';
import { UpdateDeathFormDto } from './dto/update-death-form.dto';

@ApiTags('death-forms')
@Controller('death-form')
export class DeathFormController {
  constructor(private readonly deathFormService: DeathFormService) {}

  @Post()
  create(@Body() createDeathFormDto: CreateDeathFormDto) {
    return this.deathFormService.create(createDeathFormDto);
  }

  @Get()
  findAll() {
    return this.deathFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deathFormService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeathFormDto: UpdateDeathFormDto,
  ) {
    return this.deathFormService.update(+id, updateDeathFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deathFormService.remove(+id);
  }
}
