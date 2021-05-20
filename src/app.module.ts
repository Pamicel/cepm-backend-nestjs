import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import config from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './auth/permission-level.guard';
import { CaslModule } from './casl/casl.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { CrossingsModule } from './crossings/crossings.module';
import { DeathModule } from './death/death.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config),
    UsersModule,
    AuthModule,
    CaslModule,
    EmailModule,
    CrossingsModule,
    DeathModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    EmailService,
  ],
})
export class AppModule {}
