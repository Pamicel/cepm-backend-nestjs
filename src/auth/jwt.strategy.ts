import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JWTPayload } from './auth.service';
import { Crossing } from '../crossings/entities/crossing.entity';
import { PermissionLevel } from './permission-level.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Crossing)
    private crossingsRepository: Repository<Crossing>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: JWTPayload) {
    try {
      const user = await this.usersRepository.findOne(payload.id);

      // If locked, check that crossing is valid and user has permission to lock
      if (payload.lockCrossing) {
        await this.crossingsRepository.findOne(payload.lockCrossing);
      }

      // If impersonation, check that impersonator has permission to impersonate
      if (payload.impersonator) {
        const imp = await this.usersRepository.findOne(payload.impersonator);
        if (imp.permissionLevel < PermissionLevel.Staff) {
          throw new Error('Cannot impersonate');
        }
      }

      return {
        ...user,
        jwtInfos: payload,
      };
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
