import {
  Body,
  Controller,
  Get,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { UserDto } from './dto/create.user.dto';
import { ApiBody } from '@nestjs/swagger';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;

  async onModuleInit() {
    const requestPatterns = ['find-all-user', 'find-one-user'];

    requestPatterns.forEach(async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  @Get('')
  getAll(): Observable<User[]> {
    return this.client.send('find-all-user', {});
  }

  @Post('/create')
  @ApiBody({ type: UserDto })
  create(@Body() users: UserDto): void {
    this.client.emit('create-user', users);
  }

  @Get(':id')
  @ApiBody({ type: UserDto })
  findOne(@Param('id') id: string): Observable<User> {
    return this.client.send('find-one-user', id);
  }

  // @Post('/create')
  // @ApiBody({ type: UserDto })
  // create(@Body() users: UserDto): void {
  //   this.client.emit('create-user', users);
  // }

  // @Post('/create')
  // @ApiBody({ type: UserDto })
  // create(@Body() users: UserDto): void {
  //   this.client.emit('create-user', users);
  // }
}
