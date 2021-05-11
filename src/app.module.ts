import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-34-252-251-16.eu-west-1.compute.amazonaws.com',
      port: 5432,
      username: 'kakqswvmdshhwj',
      password:
        'b27dc8a70f086610fae0f670e84b2c8690be99b36fa426283c74874cd52be918',
      database: 'dbfr83emrjf0uq',
      entities: [User],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
      // migrations: ['./_migrations/*{.ts,.js'],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
