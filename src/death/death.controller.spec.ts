import { Test, TestingModule } from '@nestjs/testing';
import { DeathController } from './death.controller';
import { DeathService } from './death.service';

describe('DeathController', () => {
  let controller: DeathController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeathController],
      providers: [DeathService],
    }).compile();

    controller = module.get<DeathController>(DeathController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
