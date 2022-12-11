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
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { GetUser } from '../util/getUserId';

@Controller('diary')
@ApiTags('diary')
@UseGuards(AuthorizationGuard)
@ApiBearerAuth('jwt')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  @ApiOperation({
    summary: '다이어리 생성',
    description: '다이어리를 생성합니다.',
  })
  createDiary(@Body() createDiaryDto: CreateDiaryDto, @GetUser() user: any) {
    return this.diaryService.createDiary(createDiaryDto, user);
  }

  @Get()
  @ApiOperation({
    summary: '다이어리 조회',
    description: '다이어리 목록을 조회합니다.',
  })
  getDiary(@GetUser() user: any) {
    return this.diaryService.getDiary(user);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '삭제할 다이어리의 _id (ObjectId)',
  })
  @ApiOperation({
    summary: '다이어리 삭제',
    description: '다이어리를 삭제합니다.',
  })
  deleteDiary(@Param('id') id: string) {
    return this.diaryService.deleteDiary(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '다이어리 정보 변경',
    description: '다이어리 정보를 변경합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '변경할 다이어리의 _id (ObjectId)',
  })
  updateDiary(@Param('id') id: string, @Body() updateDiaryDto: UpdateDiaryDto) {
    return this.diaryService.updateDiary(id, updateDiaryDto);
  }
}
