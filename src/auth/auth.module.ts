import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CrossingsModule } from '../crossings/crossings.module';
import { CrossingsService } from '../crossings/crossings.service';
import { DeathModule } from '../death/death.module';
import { EmailModule } from '../email/email.module';
import { EmailService } from '../email/email.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    EmailModule,
    CrossingsModule,
    DeathModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    EmailService,
    CrossingsService,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
