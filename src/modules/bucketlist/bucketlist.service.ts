import { BadRequestException, Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import mongoose from 'mongoose';
import { BucketlistSchema } from 'schema/schema.md';
import { CreateBucketlistDto } from './dto/create-bucketlist.dto';
import { UpdateBucketlistDto } from './dto/update-bucketlist.dto';

@Injectable()
export class BucketlistService {
  constructor(
    @Inject('DBConnections') private readonly connections: Map<string, Promise<mongoose.Connection>>,
  ) {}

  async createBucketlist(createBucketlistDto: CreateBucketlistDto, user) {
    const connection = await this.connections.get('gateway')
    const BucketListModel = connection.model('bucketlist', BucketlistSchema)

    const queryResult = await BucketListModel.create({
      ...createBucketlistDto,
      user_id: user.id
    })

    if(queryResult) {
      return { message: 'successful', data: queryResult }
    } else {
      throw new ServiceUnavailableException({ message: 'ServiceUnavailableException', errorMessage: '데이터베이스 연결 및 기타 서버 오류입니다.' })
    }
  }

  async getBucketlist(id) {
    const connection = await this.connections.get('gateway')
    const TodoModel = connection.model('bucketlist', BucketlistSchema)

    const todo = await TodoModel.find({ user_id: id }).limit(10).select(['-createdAt', '-updatedAt']).lean()

    if(todo) {
      return { message: 'successful', data: todo }
    } else {
      throw new ServiceUnavailableException({ message: 'ServiceUnavailableException', errorMessage: '데이터베이스 연결 및 기타 서버 오류입니다.' })
    }
  }

  async deleteBucketlist(id) {
    const connection = await this.connections.get('gateway')
    const BucketListModel = connection.model('bucketlist', BucketlistSchema)

    const result = await BucketListModel.deleteOne({ _id: id })

    if(result.deletedCount) {
      return { message: 'successful' }
    } else {
      throw new BadRequestException({ message: 'BadRequestException', errorMessage: '존재하지 않는 할일입니다.' })
    }
  }

  async updateBucketlist(id, updateBucketlistDto: UpdateBucketlistDto) {
    const connection = await this.connections.get('gateway')
    const BucketListModel = connection.model('bucketlist', BucketlistSchema)

    const result = await BucketListModel.updateOne({ _id: id }, { $set: updateBucketlistDto})

    if(result.matchedCount) {
      return { message: 'successful' }
    } else {
      throw new BadRequestException({ message: 'BadRequestException', errorMessage: '존재하지 않는 할일입니다.' })
    }
  }
}
