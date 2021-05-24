import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeathFormController } from './death-form.controller';
import { DeathFormService } from './death-form.service';
import { DeathForm } from './entities/death-form.entity';

describe('DeathFormController', () => {
  let controller: DeathFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeathFormController],
      providers: [
        DeathFormService,
        { provide: getRepositoryToken(DeathForm), useValue: {} },
      ],
    }).compile();

    controller = module.get<DeathFormController>(DeathFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
