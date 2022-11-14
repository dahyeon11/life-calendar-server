import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/signin-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { GetUser } from '../util/getUserId';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @Get()
  @UseGuards(AuthorizationGuard)
  getUser(@GetUser() user: any) {
    return this.userService.getUser(user.id)
  }
}
