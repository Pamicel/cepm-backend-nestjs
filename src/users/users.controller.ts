import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
  // SerializeOptions,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { RequiredPermissionLevel } from '../auth/permission-level.decorator';
import { PermissionLevel } from '../auth/permission-level.enum';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @RequiredPermissionLevel(PermissionLevel.Staff)
  create(@Body() createUsersDto: CreateUsersDto): Promise<User> {
    return this.usersService.create(createUsersDto);
  }

  @Get()
  @RequiredPermissionLevel(PermissionLevel.Director)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @RequiredPermissionLevel(PermissionLevel.Staff)
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Get('me')
  findSelf(@Request() req): Promise<User> {
    return this.usersService.findOne(req.user.id);
  }

  @Patch(':id')
  @RequiredPermissionLevel(PermissionLevel.Staff)
  update(
    @Param('id') id: string,
    @Body() updateUsersDto: UpdateUsersDto,
  ): Promise<User> {
    return this.usersService.updateUser(+id, updateUsersDto);
  }

  @Delete(':id')
  @RequiredPermissionLevel(PermissionLevel.Director)
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUser(+id);
  }
}
