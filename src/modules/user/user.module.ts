import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JWTModule } from '../util/jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: (process.env.NODE_ENV === 'dev') ? '.env.dev'
      : (process.env.NODE_ENV === 'localhost') ? '.env.localhost'
      : (process.env.NODE_ENV === 'release') ? '.env.release' : ''
    }),
    JWTModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
