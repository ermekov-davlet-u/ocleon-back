import { Test, TestingModule } from '@nestjs/testing';
import { MaterialListService } from './material-list.service';

describe('MaterialListService', () => {
  let service: MaterialListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialListService],
    }).compile();

    service = module.get<MaterialListService>(MaterialListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
