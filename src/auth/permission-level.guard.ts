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
    if (!requiredPermLevel) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredPermLevel <= user.permissionLevel;
  }
}
