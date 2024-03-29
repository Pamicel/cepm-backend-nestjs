import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { HttpService } from '@nestjs/common';
import { DeathService } from '../death/death.service';
import { CrossingsService } from '../crossings/crossings.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: EmailService,
          useValue: {},
        },
        {
          provide: CrossingsService,
          useValue: {},
        },
        {
          provide: DeathService,
          useValue: {},
        },
        {
          provide: HttpService,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
        {
          // https://stackoverflow.com/questions/57099863
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getConnectionToken(),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
