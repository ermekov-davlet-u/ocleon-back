import { Test, TestingModule } from '@nestjs/testing';
import { ArmortypesController } from './armortypes.controller';
import { ArmortypesService } from './armortypes.service';

describe('ArmortypesController', () => {
  let controller: ArmortypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmortypesController],
      providers: [ArmortypesService],
    }).compile();

    controller = module.get<ArmortypesController>(ArmortypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
