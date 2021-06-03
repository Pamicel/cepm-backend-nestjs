import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import ormConfig from '../ormconfig';
import ormConfigTesting from '../ormconfig-testing';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './auth/permission-level.guard';
import { CaslModule } from './casl/casl.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { CrossingsModule } from './crossings/crossings.module';
import { DeathModule } from './death/death.module';
import { DeathFormModule } from './death-form/death-form.module';
import { DeathGroupModule } from './death-group/death-group.module';
import { QuestionsAnswersModule } from './questions-answers/questions-answers.module';
import { StaffVoteProfileModule } from './staff-vote-profile/staff-vote-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === 'test'
        ? {
            ...ormConfigTesting,
            keepConnectionAlive: true,
            autoLoadEntities: true,
            migrationsRun: true,
          }
        : ormConfig,
    ),
    UsersModule,
    AuthModule,
    CaslModule,
    EmailModule,
    CrossingsModule,
    DeathModule,
    DeathFormModule,
    DeathGroupModule,
    QuestionsAnswersModule,
    StaffVoteProfileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useExisting: JwtAuthGuard,
    },
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useExisting: PermissionsGuard,
    },
    PermissionsGuard,
    EmailService,
  ],
  exports: [TypeOrmModule],
})
export class AppModule {}
