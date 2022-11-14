import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { GetUser } from '../util/getUserId';

@Controller('todo')
@ApiTags('todo')
@UseGuards(AuthorizationGuard)
@ApiBearerAuth('jwt')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto, @GetUser() user: any) {
    return this.todoService.createTodo(createTodoDto, user);
  }

  @Get()
  getTodo(@GetUser() user: any) {
    return this.todoService.getTodo(user.id);
  }
}
