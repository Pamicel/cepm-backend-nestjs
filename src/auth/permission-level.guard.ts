import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionLevel } from './permission-level.enum';
import { PERMISSIONS_KEY } from './permission-level.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermLevel = this.reflector.getAllAndOverride<PermissionLevel>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (requiredPermLevel === undefined || requiredPermLevel === null) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // Can use locked if jwt has locked crossing
    if (
      requiredPermLevel === PermissionLevel.Locked &&
      user.jwtInfos.lockCrossing !== undefined &&
      user.jwtInfos.lockCrossing !== null
    ) {
      return true;
    }

    return requiredPermLevel <= user.permissionLevel;
  }
}
