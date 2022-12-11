import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { ErrorResponse } from '../util/common-error-decorator';
import { GetUser } from '../util/getUserId';
import { CommonError } from '../util/schema/common-error.definition.dto';
import { BucketlistService } from './bucketlist.service';
import { CreateBucketlistDto } from './dto/create-bucketlist.dto';
import { UpdateBucketlistDto } from './dto/update-bucketlist.dto';

@Controller('bucketlist')
@ApiTags('bucketlist')
@UseGuards(AuthorizationGuard)
@ApiBearerAuth('jwt')
export class BucketlistController {
  constructor(private readonly bucketlistService: BucketlistService) {}

  @Post()
  @ApiOperation({
    summary: '버킷 리스트 생성',
    description: '버킷 리스트를 생성합니다.',
  })
  @ErrorResponse(HttpStatus.BAD_REQUEST, CommonError.VALIDATION_FAILURE)
  @ErrorResponse(HttpStatus.NON_AUTHORITATIVE_INFORMATION, [
    CommonError.UNAUTHORIZED_EXPIRED,
    CommonError.UNAUTHORIZED_INVALID,
  ])
  @ErrorResponse(
    HttpStatus.PRECONDITION_FAILED,
    CommonError.UNAUTHORIZED_PRECONDITION_FAILED,
  )
  @ErrorResponse(
    HttpStatus.SERVICE_UNAVAILABLE,
    CommonError.SERVICE_UNAVAILABLE,
  )
  createbucketList(
    @Body() createbucketListDto: CreateBucketlistDto,
    @GetUser() user: any,
  ) {
    return this.bucketlistService.createBucketlist(createbucketListDto, user);
  }

  @Get()
  @ApiOperation({
    summary: '버킷 리스트 조회',
    description: '버킷 리스트 정보를 조회합니다.',
  })
  @ErrorResponse(HttpStatus.BAD_REQUEST, CommonError.VALIDATION_FAILURE)
  @ErrorResponse(HttpStatus.NON_AUTHORITATIVE_INFORMATION, [
    CommonError.UNAUTHORIZED_EXPIRED,
    CommonError.UNAUTHORIZED_INVALID,
  ])
  @ErrorResponse(
    HttpStatus.PRECONDITION_FAILED,
    CommonError.UNAUTHORIZED_PRECONDITION_FAILED,
  )
  @ErrorResponse(
    HttpStatus.SERVICE_UNAVAILABLE,
    CommonError.SERVICE_UNAVAILABLE,
  )
  getbucketList(@GetUser() user: any) {
    return this.bucketlistService.getBucketlist(user.id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '버킷 리스트 삭제',
    description: '버킷 리스트를 삭제합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '삭제할 버킷 리스트의 _id (ObjectId)',
  })
  @ErrorResponse(HttpStatus.BAD_REQUEST, CommonError.VALIDATION_FAILURE)
  @ErrorResponse(HttpStatus.NON_AUTHORITATIVE_INFORMATION, [
    CommonError.UNAUTHORIZED_EXPIRED,
    CommonError.UNAUTHORIZED_INVALID,
  ])
  @ErrorResponse(
    HttpStatus.PRECONDITION_FAILED,
    CommonError.UNAUTHORIZED_PRECONDITION_FAILED,
  )
  @ErrorResponse(
    HttpStatus.SERVICE_UNAVAILABLE,
    CommonError.SERVICE_UNAVAILABLE,
  )
  deleteDiary(@Param('id') id: string) {
    return this.bucketlistService.deleteBucketlist(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '버킷 리스트 정보 변경',
    description: '버킷 리스트 상세 정보를 변경합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '삭제할 버킷 리스트의 _id (ObjectId)',
  })
  @ErrorResponse(HttpStatus.BAD_REQUEST, CommonError.VALIDATION_FAILURE)
  @ErrorResponse(HttpStatus.NON_AUTHORITATIVE_INFORMATION, [
    CommonError.UNAUTHORIZED_EXPIRED,
    CommonError.UNAUTHORIZED_INVALID,
  ])
  @ErrorResponse(
    HttpStatus.PRECONDITION_FAILED,
    CommonError.UNAUTHORIZED_PRECONDITION_FAILED,
  )
  @ErrorResponse(
    HttpStatus.SERVICE_UNAVAILABLE,
    CommonError.SERVICE_UNAVAILABLE,
  )
  updateDiary(
    @Param('id') id: string,
    @Body() updateBucketlistDto: UpdateBucketlistDto,
  ) {
    return this.bucketlistService.updateBucketlist(id, updateBucketlistDto);
  }
}
