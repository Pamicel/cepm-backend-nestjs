import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class MockGuard implements CanActivate {
  canActivate() {
    return true;
  }
}
