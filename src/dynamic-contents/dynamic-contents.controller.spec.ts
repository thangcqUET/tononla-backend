import { Test, TestingModule } from '@nestjs/testing';
import { DynamicContentsController } from './dynamic-contents.controller';
import { DynamicContentsService } from './dynamic-contents.service';

describe('DynamicContentsController', () => {
  let controller: DynamicContentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DynamicContentsController],
      providers: [DynamicContentsService],
    }).compile();

    controller = module.get<DynamicContentsController>(DynamicContentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
