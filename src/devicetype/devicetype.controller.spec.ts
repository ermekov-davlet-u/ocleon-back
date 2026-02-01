import { Test, TestingModule } from '@nestjs/testing';
import { DevicetypeController } from './devicetype.controller';
import { DevicetypeService } from './devicetype.service';

describe('DevicetypeController', () => {
  let controller: DevicetypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicetypeController],
      providers: [DevicetypeService],
    }).compile();

    controller = module.get<DevicetypeController>(DevicetypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
