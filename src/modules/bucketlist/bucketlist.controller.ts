import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { GetUser } from '../util/getUserId';
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
  updateDiary(
    @Param('id') id: string,
    @Body() updateBucketlistDto: UpdateBucketlistDto,
  ) {
    return this.bucketlistService.updateBucketlist(id, updateBucketlistDto);
  }
}
