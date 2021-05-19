import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  private signJWT({
    email,
    id,
    dateCreated,
    permissionLevel,
  }: {
    email: string;
    id: number;
    dateCreated: string;
    permissionLevel: number;
  }) {
    return this.jwtService.sign({
      email,
      id,
      dateCreated,
      permissionLevel,
    });
  }

  async validatePassword({ user, password }: { user: User; password: string }) {
    return password && (await bcrypt.compare(password, user.password));
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

    const isValid =
      magicToken && (await bcrypt.compare(magicToken, user.magicToken));

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
      const validPassword = this.validatePassword({ user, password });
      const validMagicToken = this.validateMagicToken({ user, magicToken });
      if (!validMagicToken && !validPassword) {
        throw new Error();
      }

      return this.signJWT({
        email,
        id: user.id,
        dateCreated: user.dateCreated,
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
    await this.usersService.updateUser(user.id, {
      magicToken: hashedMagicToken,
    });
    return;
  }

  async verify(user): Promise<string> {
    return this.signJWT({
      email: user.email,
      id: user.id,
      dateCreated: user.dateCreated,
      permissionLevel: user.permissionLevel,
    });
  }

  async renew(user): Promise<string> {
    return this.signJWT({
      email: user.email,
      id: user.id,
      dateCreated: user.dateCreated,
      permissionLevel: user.permissionLevel,
    });
  }
}
