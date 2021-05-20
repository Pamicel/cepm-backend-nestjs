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
  Req,
  HttpException,
  HttpStatus,
  // SerializeOptions,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { RequiredPermissionLevel } from '../auth/permission-level.decorator';
import { PermissionLevel } from '../auth/permission-level.enum';
import { UpdateUserPermissionDto } from './dto/update-user-permission.dto';

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
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Patch(':id/permission')
  @RequiredPermissionLevel(PermissionLevel.Admin)
  updatePermission(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdateUserPermissionDto,
  ): Promise<User> {
    return this.usersService.updateUserPermission(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req): Promise<User> {
    const { user } = req;
    if (user.id !== id && user.permissionLevel < PermissionLevel.Admin) {
      throw new HttpException('Can only delete self', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.deleteUser(+id, user.permissionLevel);
  }
}
