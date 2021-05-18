import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

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
      const incorrectPassword = password && user.password !== password;
      const incorrectMagicToken = magicToken && user.magicToken !== magicToken;
      if (incorrectPassword || incorrectMagicToken) {
        throw new Error();
      }
      return this.jwtService.sign({
        email: email,
        id: user.id,
      });
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  private generate() {
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
    const magicToken = this.generate();
    await this.emailService.sendMagicLink({
      recipient: user.email,
      data: { magicToken },
    });
    // todo hash
    await this.usersService.updateUser(user.id, { magicToken });
    return;
  }
}
