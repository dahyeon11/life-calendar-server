import { Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { TodoSchema } from 'schema/schema.md';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import mongoose from 'mongoose';

@Injectable()
export class TodoService {
  constructor(
    @Inject('DBConnections') private readonly connections: Map<string, Promise<mongoose.Connection>>,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto, user: any) {
    const connection = await this.connections.get('gateway')
    const TodoModel = connection.model('todo', TodoSchema)

    const queryResult = await TodoModel.create({
      ...createTodoDto,
      user_id: user.id
    })

    if(queryResult) {
      return { message: 'successful', data: queryResult }
    } else {
      throw new ServiceUnavailableException({ message: 'ServiceUnavailableException', errorMessage: '데이터베이스 연결 및 기타 서버 오류입니다.' })
    }
  }

  async getTodo(id?: string) {
    const connection = await this.connections.get('gateway')
    const TodoModel = connection.model('todo', TodoSchema)

    const todo = await TodoModel.find({ user_id: id }).limit(10).select(['-createdAt', '-updatedAt']).lean()

    if(todo) {
      return { message: 'successful', data: todo }
    } else {
      throw new ServiceUnavailableException({ message: 'ServiceUnavailableException', errorMessage: '데이터베이스 연결 및 기타 서버 오류입니다.' })
    }
  }

}
