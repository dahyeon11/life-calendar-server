import { Test, TestingModule } from '@nestjs/testing';
import { BucketlistService } from './bucketlist.service';

describe('BucketlistService', () => {
  let service: BucketlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BucketlistService],
    }).compile();

    service = module.get<BucketlistService>(BucketlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
