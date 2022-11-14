import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
  createDiary(@Body() createDiaryDto: CreateDiaryDto, @GetUser() user: any) {
    return this.diaryService.createDiary(createDiaryDto, user);
  }

  @Get()
  getDiary(@GetUser() user: any) {
    return this.diaryService.getDiary(user);
  }
}
