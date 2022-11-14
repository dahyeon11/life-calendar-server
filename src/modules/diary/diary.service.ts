import { Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { DiarySchema } from 'schema/schema.md';

@Injectable()
export class DiaryService {
  constructor(
    @Inject('DBConnections') private readonly connections: Map<string, Promise<mongoose.Connection>>,
  ) {}
  
  async createDiary(createDiaryDto: CreateDiaryDto, user: any) {
    const connection = await this.connections.get('gateway')
    const DiaryModel = connection.model('diary', DiarySchema)

    const queryResult = await DiaryModel.create({
      ...createDiaryDto,
      user_id: user.id
    })

    if(queryResult) {
      return { message: 'successful', data: queryResult }
    } else {
      throw new ServiceUnavailableException({ message: 'ServiceUnavailableException', errorMessage: '데이터베이스 연결 및 기타 서버 오류입니다.' })
    }
  }

  async getDiary(user: any) {
    const connection = await this.connections.get('gateway')
    const DiaryModel = connection.model('diary', DiarySchema)

    const diary = await DiaryModel.find({ user_id: user.id }).select(['-createdAt', '-updatedAt']).lean()

    if(diary) {
      return { message: 'successful', data: diary }
    } else {
      throw new ServiceUnavailableException({ message: 'ServiceUnavailableException', errorMessage: '데이터베이스 연결 및 기타 서버 오류입니다.' })
    }
  }

}
