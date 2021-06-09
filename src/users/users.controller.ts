import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ClassSerializerInterceptor,
  UseInterceptors,
  Req,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { RequiredPermissionLevel } from '../auth/permission-level.decorator';
import { PermissionLevel } from '../auth/permission-level.enum';
import { UpdateUserPermissionDto } from './dto/update-user-permission.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { Action, CaslAbilityFactory } from '../casl/casl-ability.factory';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

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
  findOne(
    @Param('id') id: string,
    @Query('full') full: boolean,
    @Req() req,
  ): Promise<User> {
    const { user } = req;
    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.can(Action.Read, new User({ id: +id }))) {
      return this.usersService.findOne(+id, { full });
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
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

  @Patch(':id/password')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdateUserPasswordDto,
    @Req() req,
  ): Promise<User> {
    const { user } = req;
    if (
      user.id !== parseInt(id) &&
      user.permissionLevel < PermissionLevel.Admin
    ) {
      throw new HttpException(
        'You can only update your own password',
        HttpStatus.FORBIDDEN,
      );
    }
    return this.usersService.updateUserPassword(+id, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req): Promise<User> {
    const { user } = req;
    if (
      user.id !== parseInt(id) &&
      user.permissionLevel < PermissionLevel.Admin
    ) {
      throw new HttpException('Can only delete self', HttpStatus.FORBIDDEN);
    }
    return this.usersService.deleteUser(+id, user.permissionLevel);
  }
}
