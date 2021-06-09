import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { CrossingsService } from '../crossings/crossings.service';
import { DeathService } from '../death/death.service';
import { PermissionLevel } from './permission-level.enum';

export class JWTPayload {
  constructor(
    public email: string,
    public id: number,
    public permissionLevel: number,
    public lockCrossing?: number,
    public impersonator?: number,
  ) {}
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private deathService: DeathService,
    private crossingsService: CrossingsService,
  ) {}

  private signJWT(payload: JWTPayload): string {
    return this.jwtService.sign(payload);
  }

  async validatePassword({ user, password }: { user: User; password: string }) {
    return await bcrypt.compare(password, user.password);
  }

  async validateMagicToken({
    user,
    magicToken,
  }: {
    user: User;
    magicToken: string;
  }) {
    if (!user.tokenIssued || !user.magicToken) {
      return false;
    }

    // Check that the magic link is 15 min old or less
    const tokenIssuedTimestamp = new Date(user.tokenIssued).getTime();
    const fifteenMinutes = 1000 * 60 * 15;
    const now = new Date().getTime();
    const expired = tokenIssuedTimestamp + fifteenMinutes < now;

    const isValid = await bcrypt.compare(magicToken, user.magicToken);

    return isValid && !expired;
  }

  async login({
    email,
    password,
    magicToken,
  }: {
    email: string;
    password?: string;
    magicToken?: string;
  }) {
    try {
      const user = await this.usersService.findOneByEmail(email);
      if (
        (!password && !magicToken) ||
        (password && !(await this.validatePassword({ user, password }))) ||
        (magicToken && !(await this.validateMagicToken({ user, magicToken })))
      ) {
        throw new Error();
      }

      return this.signJWT({
        email,
        id: user.id,
        permissionLevel: user.permissionLevel,
      });
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  private generateMagicToken() {
    let result = '';
    const length = 6;
    const characters = '123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async createMagicToken(email) {
    let user;
    try {
      user = await this.usersService.findOneByEmail(email);
    } catch (error) {
      user = await this.usersService.create({ email });
    }
    const magicToken = this.generateMagicToken();
    await this.emailService.sendMagicLink({
      recipient: user.email,
      data: { magicToken },
    });
    // todo hash

    const saltOrRounds = 10;
    const hashedMagicToken = await bcrypt.hash(magicToken, saltOrRounds);
    await this.usersService.updateUserMagicToken(user.id, {
      magicToken: hashedMagicToken,
    });
    return;
  }

  async verify(user): Promise<string> {
    return this.signJWT({
      email: user.email,
      id: user.id,
      permissionLevel: user.permissionLevel,
      lockCrossing: user.jwtInfos.lockCrossing,
      impersonator: user.jwtInfos.impersonator,
    });
  }

  async lock(user, crossingId: number): Promise<string> {
    try {
      await this.crossingsService.findOne(crossingId);
    } catch (error) {
      throw new HttpException('Crossing not found', HttpStatus.NOT_FOUND);
    }

    return this.signJWT({
      id: user.id,
      email: user.email,
      permissionLevel: user.permissionLevel,
      lockCrossing: crossingId,
    });
  }

  async revertImpersonation(reqUser): Promise<string> {
    const staffId = reqUser.jwtInfos.impersonator;

    try {
      const user = await this.usersService.findOne(staffId);
      if (user.permissionLevel < PermissionLevel.Staff) {
        throw new Error('Only staff can lock/impersonate');
      }
      return this.signJWT({
        id: user.id,
        email: user.email,
        permissionLevel: user.permissionLevel,
        lockCrossing: reqUser.jwtInfos.lockCrossing,
      });
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async unlock(email: string) {
    let user: User;
    try {
      user = await this.usersService.findOneByEmail(email);
    } catch (error) {
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }

    if (user?.permissionLevel < PermissionLevel.Staff) {
      throw new HttpException('Only staff can unlock', HttpStatus.FORBIDDEN);
    }
    return this.createMagicToken(email);
  }

  async impersonate({
    staffId,
    deathIDC,
    crossingId,
    deathWord,
    crossingWord,
  }: {
    staffId: number;
    deathIDC: number;
    crossingId: number;
    deathWord: string;
    crossingWord: string;
  }) {
    try {
      const death = await this.deathService.findOneByIDC(
        deathIDC,
        crossingId,
        deathWord,
        crossingWord,
      );
      const { user } = death;

      return this.signJWT({
        email: user.email,
        id: user.id,
        permissionLevel: user.permissionLevel,
        lockCrossing: crossingId,
        impersonator: staffId,
      });
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
