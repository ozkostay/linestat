import { Test, TestingModule } from '@nestjs/testing';
import { TurnamentController } from './turnament.controller';
import { TurnamentService } from './turnament.service';

describe('TurnamentController', () => {
  let controller: TurnamentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurnamentController],
      providers: [TurnamentService],
    }).compile();

    controller = module.get<TurnamentController>(TurnamentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
