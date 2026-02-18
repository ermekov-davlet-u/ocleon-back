import { Test, TestingModule } from '@nestjs/testing';
import { MaterialListController } from './material-list.controller';
import { MaterialListService } from './material-list.service';

describe('MaterialListController', () => {
  let controller: MaterialListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialListController],
      providers: [MaterialListService],
    }).compile();

    controller = module.get<MaterialListController>(MaterialListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
