import { Test, TestingModule } from '@nestjs/testing';
import { TennisController } from './tennis.controller';
import { TennisService } from './tennis.service';

describe('TennisController', () => {
  let controller: TennisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TennisController],
      providers: [TennisService],
    }).compile();

    controller = module.get<TennisController>(TennisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
