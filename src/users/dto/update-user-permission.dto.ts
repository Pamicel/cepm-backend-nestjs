import { IsNumber, Max, Min } from 'class-validator';
import { PermissionLevel } from '../../auth/permission-level.enum';

export class UpdateUserPermissionDto {
  @IsNumber()
  @Min(PermissionLevel.User)
  @Max(PermissionLevel.Director)
  permissionLevel: number;
}
