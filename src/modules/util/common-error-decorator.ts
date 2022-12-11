import {
  applyDecorators,
  HttpException,
  HttpStatus,
  Type,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
  refs,
} from '@nestjs/swagger';
import { ErrorCommonResponse } from './errors/common-error-response.dto';
import { HttpExceptionErrorResponseDto } from './errors/httpexception-error-response.dto';
import { ValidationErrorResponseDto } from './errors/validation-error-response.dto';
import { CustomValidationError } from './errors/validation-error.dto';
import { makeInstanceByApiProperty } from './make-instance';

export interface ErrorResponseOption {
  /**
   * HttpException을 extend한 에러 타입을 인자로 받습니다.
   * 예시 : BadRequestException
   */
  model: Type<HttpException>;
  /**
   * 예시의 제목을 적습니다
   */
  exampleTitle: string;
  /**
   * 서비스 레이어에서 적었던 오류 메시지를 기술합니다.
   */
  errorMessage: string | Record<string, Array<string>>;
  /**
   * 어떠한 상황일 때 오류가나는지 기술합니다.
   */
  exampleDescription: string;
  /**
   * 에러 코드에 대해 기술합니다.
   */
  code?: string;

  /**
   * 추가적인 에러 객체 전달이 필요한 경우
   */
  additionalDisplayObject?: Object;
}

/**
 * 에러를 손쉽게 적기위한 데코레이터입니다.
 * 기본적으로 status 코드가 같으면 하나밖에 못적기때문에 example을 추가하기위해서 커스텀 하였습니다.
 * @param StatusCode 응답 코드입니다. HttpStatus enum 값을 사용하시면됩니다.
 * @param errorResponseOption ErrorResponseOption[] 같은 코드에 여러 example을 추가하기위한 옵션입니다.
 * @returns
 */
export const ErrorResponse = (
  StatusCode: HttpStatus,
  errorResponseOption: ErrorResponseOption | ErrorResponseOption[],
) => {
  let flagValidationErrorExist = false;
  if (!Array.isArray(errorResponseOption)) {
    errorResponseOption = [errorResponseOption];
  }
  const examples = errorResponseOption
    .map((error: ErrorResponseOption) => {
      let innerErrorDto;
      if (error.model === CustomValidationError) {
        flagValidationErrorExist = true;
        if (typeof error.errorMessage === 'string') {
          throw Error(
            '검증오류는 넘겨줄때 Record<string, Array<string>> 타입으로 주셔야합니다.',
          );
        }
        if (error.additionalDisplayObject) {
          innerErrorDto = new ValidationErrorResponseDto(error.errorMessage);
        }
      } else {
        if (typeof error.errorMessage !== 'string') {
          throw Error('http오류는 넘겨줄때 string 타입으로 주셔야합니다.');
        }
        if (error.additionalDisplayObject) {
          innerErrorDto = new HttpExceptionErrorResponseDto(
            StatusCode,
            error.model.name,
            error.errorMessage,
            error.code,
          );
        }
      }
      const commonErrorInstance =
        makeInstanceByApiProperty<ErrorCommonResponse<any, any>>(
          ErrorCommonResponse,
        );
      commonErrorInstance.message = error.model.name;
      commonErrorInstance.errorMessage = error.errorMessage;
      commonErrorInstance.error = innerErrorDto;
      return {
        [error.exampleTitle]: {
          value: commonErrorInstance,
          description: error.exampleDescription,
        },
      };
    })
    .reduce(function (result, item) {
      Object.assign(result, item);
      return result;
    }, {}); // null 값 있을경우 필터링
  //console.log(examples);
  return applyDecorators(
    ApiExtraModels(
      ErrorCommonResponse,
      HttpExceptionErrorResponseDto,
      ValidationErrorResponseDto,
    ),
    ApiResponse({
      status: StatusCode,
      content: {
        'application/json': {
          schema: {
            additionalProperties: { $ref: getSchemaPath(ErrorCommonResponse) },
            oneOf: flagValidationErrorExist
              ? [
                  { $ref: getSchemaPath(ValidationErrorResponseDto) },
                  { $ref: getSchemaPath(HttpExceptionErrorResponseDto) },
                ]
              : [{ $ref: getSchemaPath(HttpExceptionErrorResponseDto) }],
          },
          examples: examples,
        },
      },
    }),
  );
};
