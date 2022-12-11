import { Test, TestingModule } from '@nestjs/testing';
import { BucketlistController } from './bucketlist.controller';
import { BucketlistService } from './bucketlist.service';

describe('BucketlistController', () => {
  let controller: BucketlistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BucketlistController],
      providers: [BucketlistService],
    }).compile();

    controller = module.get<BucketlistController>(BucketlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
