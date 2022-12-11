import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsObject, IsString } from 'class-validator';

export class SuccessfulDto<T> {
  constructor(message: 'successful', data: T) {
    this.message = message;
    this.data = data;
  }

  @IsString()
  readonly message: 'successful';

  @IsObject()
  @ApiProperty({ type: 'generic' })
  @Expose()
  readonly data: T;
}
