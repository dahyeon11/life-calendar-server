import { HttpStatus, Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type as transformerType } from 'class-transformer';

import { EnumToArray } from '../enumtoarray';

export class ErrorCommonResponse<T, K> {
  /*
  @ApiProperty({ enum: EnumToArray(HttpStatus), description: '상태코드' })
  @Expose()
  readonly statusCode: number;
  */

  /*
  @ApiProperty({ type: String, description: '에러 발생시간' })
  @Expose()
  readonly timestamp: Date;
  */
  @ApiProperty({ type: String, description: '응답 메시지' })
  @Expose()
  message: T;

  @ApiProperty({ type: String, description: '에러 메시지' })
  @Expose()
  errorMessage: T;

  /*
  @ApiProperty({ type: String, description: '에러 발생 url' })
  @Expose()
  readonly path: string;
  @ApiProperty({ type: String, description: '에러 발생 메소드' })
  @Expose()
  readonly method: string;
  */

  @ApiProperty({
    type: 'generic',
    description:
      'HttpExceptionErrorResponseDto,ValidationErrorResponseDto 두가지가 올수있습니다.',
  })
  @Expose()
  error?: K;

  //   @ApiProperty({ type: () => PageMetaDto })
  //   @Type(() => PageMetaDto)
  //   @Expose()
  //   readonly meta: PageMetaDto;

  //   constructor(data: T[], meta: PageMetaDto) {
  //     this.data = data;
  //     this.meta = meta;
  //   }
}
