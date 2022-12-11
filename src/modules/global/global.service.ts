import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class GlobalService {
  constructor(private readonly configService: ConfigService) {}

  public pbkdf2Hash(password: string) {
    const salt = this.configService.get('SALT');

    const hash = crypto.pbkdf2Sync(password, salt, 20000, 256, 'sha512');

    return hash.toString('hex');
  }

  public generateTimestampRange(year: string, month: string) {
    if (!year) {
      throw new BadRequestException({
        message: 'BadRequestException',
        errorMessage: 'year 값이 입력되지 않았습니다.',
      });
    }
    let startDate: Date, endDate: Date;
    if (month) {
      startDate = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, 1));
      endDate = new Date(Date.UTC(parseInt(year), parseInt(month), 0));
    } else {
      startDate = new Date(Date.UTC(parseInt(year), 0, 1));
      endDate = new Date(Date.UTC(parseInt(year), 12, 0));
    }

    return { startDate, endDate };
  }
}
