import { Injectable, OnApplicationBootstrap, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { setConnection } from './database.service';

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  constructor(
    @Inject('DBConnections')
    private readonly connections: Map<string, Promise<mongoose.Connection>>,
    private readonly configService: ConfigService
  ) {}

  async onApplicationBootstrap() {
    setConnection('gateway', this.configService.get('DATABASE_URL'))
    if(!this.connections.has('gateway')){
      //센트리
      throw new Error("게이트웨이 데이터베이스의 정보가 정확하지 않습니다");
    }
    console.log('DB Connection List')
    console.log(this.connections);
  }
}