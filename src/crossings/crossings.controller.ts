import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequiredPermissionLevel } from 'src/auth/permission-level.decorator';
import { PermissionLevel } from 'src/auth/permission-level.enum';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CrossingsService } from './crossings.service';
import { CreateCrossingDto } from './dto/create-crossing.dto';
import { UpdateCrossingDto } from './dto/update-crossing.dto';
import { Crossing } from './entities/crossing.entity';

@ApiTags('crossings')
@Controller('crossings')
export class CrossingsController {
  constructor(
    private readonly crossingsService: CrossingsService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  @RequiredPermissionLevel(PermissionLevel.Director)
  create(@Body() createCrossingDto: CreateCrossingDto) {
    return this.crossingsService.create(createCrossingDto);
  }

  @Get()
  findAll(@Req() req) {
    const { user } = req;
    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.cannot(Action.Read, new Crossing({ archived: true }))) {
      return this.crossingsService.findAllOpen();
    } else {
      return this.crossingsService.findAll();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const crossing = await this.crossingsService.findOne(+id);

    const { user } = req;
    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.can(Action.Read, crossing)) {
      return crossing;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Patch(':id')
  @RequiredPermissionLevel(PermissionLevel.Director)
  update(
    @Param('id') id: string,
    @Body() updateCrossingDto: UpdateCrossingDto,
  ) {
    return this.crossingsService.update(+id, updateCrossingDto);
  }

  @Delete(':id')
  @RequiredPermissionLevel(PermissionLevel.Director)
  remove(@Param('id') id: string) {
    return this.crossingsService.remove(+id);
  }
}
