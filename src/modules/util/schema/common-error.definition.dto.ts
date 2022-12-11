import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
//import { ThrottlerException } from '@nestjs/throttler';
import { ErrorResponseOption } from '../common-error-decorator';
type Keys =
  | 'VALIDATION_FAILURE'
  | 'INVALID_SITE'
  | 'INVALID_GROUP'
  | 'INVALID_PROJECT'
  | 'UNAUTHORIZED_EXPIRED'
  | 'UNAUTHORIZED_INVALID'
  | 'UNAUTHORIZED_PRECONDITION_FAILED'
  | 'INTERNAL_SERVER_ERROR'
  | 'SERVICE_UNAVAILABLE';

export const CommonError: Record<Keys, ErrorResponseOption & { code: string }> =
  {
    //400
    VALIDATION_FAILURE: {
      model: BadRequestException,
      exampleDescription: '데이터 유효성 검사 실패 시 발생하는 오류',
      exampleTitle: '유효성 검사 오류',
      errorMessage: '유효성 검사에 실패하였습니다.',
      code: 'VALIDATION',
    },
    INVALID_GROUP: {
      model: BadRequestException,
      exampleDescription:
        '존재하지 않거나 잘못된 그룹 Id를 전송했을 때 발생하는 오류',
      exampleTitle: '잘못된 그룹 Id',
      errorMessage: '존재하지 않거나 잘못된 그룹 Id입니다.',
      code: 'INVALID_GROUP',
    },
    INVALID_SITE: {
      model: BadRequestException,
      exampleDescription:
        '존재하지 않거나 잘못된 프로젝트 코드를 전송했을 때 발생하는 오류',
      exampleTitle: '잘못된 프로젝트 코드',
      errorMessage: 'project code is invalid',
      code: 'INVALID_SITE',
    },
    INVALID_PROJECT: {
      model: BadRequestException,
      exampleDescription:
        '존재하지 않거나 잘못된 기관 Id를 전송했을 때 발생하는 오류',
      exampleTitle: '잘못된 기관 Id',
      errorMessage: '존재하지 않거나 잘못된 기관 Id입니다.',
      code: 'INVALID_PROJECT',
    },
    UNAUTHORIZED_EXPIRED: {
      model: UnauthorizedException,
      exampleDescription: '인증 토큰이 만료되었을 때 발생하는 오류입니다.',
      exampleTitle: '인증 오류',
      errorMessage: '토큰이 만료되었습니다.',
      code: 'UNAUTHORIZED_EXPIRED',
    },
    UNAUTHORIZED_INVALID: {
      model: UnauthorizedException,
      exampleDescription: '토큰이 정상적인 값이 아닐 경우 발생하는 오류입니다.',
      exampleTitle: '인증 오류',
      errorMessage: '잘못된 토큰입니다.',
      code: 'UNAUTHORIZED_INVALID',
    },
    UNAUTHORIZED_PRECONDITION_FAILED: {
      model: PreconditionFailedException,
      exampleDescription: '인증 정보가 존재하지 않을 때 발생하는 오류입니다.',
      exampleTitle: '인증 오류',
      errorMessage: '토큰이 존재하지 않습니다.',
      code: 'UNAUTHORIZED_PRECONDITION_FAILED',
    },
    INTERNAL_SERVER_ERROR: {
      model: InternalServerErrorException,
      exampleDescription: '서버 내부의 잘못된 동작으로 인한 오류',
      exampleTitle: '서버 오류',
      errorMessage:
        'a network_related or database instance_specific error occured while find data',
      code: 'INTERNAL_SERVER_ERROR',
    },
    SERVICE_UNAVAILABLE: {
      model: InternalServerErrorException,
      exampleDescription: '알 수 없는 오류',
      exampleTitle: '알 수 없는 오류',
      errorMessage:
        'a network_related or database instance_specific error occured while find data',
      code: 'SERVICE_UNAVAILABLE',
    },
  };
