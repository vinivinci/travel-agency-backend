import { Test, TestingModule } from '@nestjs/testing';
import { TravelPackagesController } from './travel-packages.controller';

describe('TravelPackagesController', () => {
  let controller: TravelPackagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelPackagesController],
    }).compile();

    controller = module.get<TravelPackagesController>(TravelPackagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
