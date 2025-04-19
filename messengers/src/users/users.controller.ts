import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { UserDto } from './dto/create.user.dto';
import { ApiBody } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

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
    const requestPatterns = ['create-user', 'find-all-user'];

    requestPatterns.forEach(async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  @Get('')
  getAll(): Observable<UserEntity[]> {
    return this.client.send('find-all-user', {});
  }

  @Post('/create')
  @ApiBody({ type: UserDto })
  create(@Body() users: UserDto): Observable<UserEntity> {
    return this.client.send('create-user', users);
  }
}
