import { Test, TestingModule } from '@nestjs/testing';
import { DynamicContentsService } from './dynamic-contents.service';

describe('DynamicContentsService', () => {
  let service: DynamicContentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamicContentsService],
    }).compile();

    service = module.get<DynamicContentsService>(DynamicContentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
