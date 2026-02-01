import { Test, TestingModule } from '@nestjs/testing';
import { DevicetypeService } from './devicetype.service';

describe('DevicetypeService', () => {
  let service: DevicetypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevicetypeService],
    }).compile();

    service = module.get<DevicetypeService>(DevicetypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
