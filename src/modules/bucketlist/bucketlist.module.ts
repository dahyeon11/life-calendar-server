import { Module } from '@nestjs/common';
import { BucketlistService } from './bucketlist.service';
import { BucketlistController } from './bucketlist.controller';

@Module({
  controllers: [BucketlistController],
  providers: [BucketlistService]
})
export class BucketlistModule {}
