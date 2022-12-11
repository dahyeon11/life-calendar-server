import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { EnumToArray } from './enumtoarray';

export class SuccessCommonResponseDto<T> {
  @ApiProperty({ type: 'string', description: 'successful' })
  @Expose()
  readonly message: 'message';

  @ApiProperty({
    type: 'generic',
    description: 'object 또는 array 형식의 응답데이타가 옵니다.',
  })
  data: T;
}
