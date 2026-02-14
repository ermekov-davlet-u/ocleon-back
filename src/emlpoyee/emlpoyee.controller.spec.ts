import { Test, TestingModule } from '@nestjs/testing';
import { EmlpoyeeController } from './emlpoyee.controller';
import { EmlpoyeeService } from './emlpoyee.service';

describe('EmlpoyeeController', () => {
  let controller: EmlpoyeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmlpoyeeController],
      providers: [EmlpoyeeService],
    }).compile();

    controller = module.get<EmlpoyeeController>(EmlpoyeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
