import { Test, TestingModule } from '@nestjs/testing';
import { TurnamentService } from './turnament.service';

describe('TurnamentService', () => {
  let service: TurnamentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnamentService],
    }).compile();

    service = module.get<TurnamentService>(TurnamentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
