import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto'


@Injectable()
export class GlobalService {
  constructor(
    private readonly configService: ConfigService
  ) {}

  public pbkdf2Hash(password: string) {
    const salt = this.configService.get('SALT')

    const hash = crypto.pbkdf2Sync(password, salt, 20000, 256, 'sha512')

    return hash.toString('hex')
  }

}