import { Test, TestingModule } from '@nestjs/testing';
import { TennisService } from './tennis.service';

describe('TennisService', () => {
  let service: TennisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TennisService],
    }).compile();

    service = module.get<TennisService>(TennisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
