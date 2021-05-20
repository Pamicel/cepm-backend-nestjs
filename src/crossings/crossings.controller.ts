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
import { CrossingsService } from './crossings.service';
import { CreateCrossingDto } from './dto/create-crossing.dto';
import { UpdateCrossingDto } from './dto/update-crossing.dto';

@ApiTags('crossings')
@Controller('crossings')
export class CrossingsController {
  constructor(private readonly crossingsService: CrossingsService) {}

  @Post()
  create(@Body() createCrossingDto: CreateCrossingDto) {
    return this.crossingsService.create(createCrossingDto);
  }

  @Get()
  findAll() {
    return this.crossingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crossingsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCrossingDto: UpdateCrossingDto,
  ) {
    return this.crossingsService.update(+id, updateCrossingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crossingsService.remove(+id);
  }
}
