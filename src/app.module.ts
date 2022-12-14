import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BucketlistModule } from './modules/bucketlist/bucketlist.module';
import { DiaryModule } from './modules/diary/diary.module';
import { GlobalModule } from './modules/global/global.module';
import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    GlobalModule,
    UserModule,
    TodoModule,
    DiaryModule,
    BucketlistModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
