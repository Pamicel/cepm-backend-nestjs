import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, Max, Min } from 'class-validator';
import { PermissionLevel } from 'src/auth/permission-level.enum';
import { CreateUsersDto } from './create-user.dto';

export class UpdateUserPermissionDto extends PartialType(CreateUsersDto) {
  @IsNumber()
  @Min(PermissionLevel.User)
  @Max(PermissionLevel.Director)
  permissionLevel: number;
}
