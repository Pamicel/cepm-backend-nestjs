import { SetMetadata } from '@nestjs/common';
import { PermissionLevel } from './permission-level.enum';

export const PERMISSIONS_KEY = 'roles';
export const RequiredPermissionLevel = (permissionLevel: PermissionLevel) =>
  SetMetadata(PERMISSIONS_KEY, permissionLevel);
