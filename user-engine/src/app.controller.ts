import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './interfaces/create.user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('find-all-user')
  getAll(): Promise<UserEntity[]> {
    return this.appService.getAll();
  }

  @MessagePattern('create-user')
  create(@Payload() data: UserDto): Promise<UserEntity> {
    this.logger.log(`Creating user: ${JSON.stringify(data)}`);

    return this.appService.create(data);
  }
}
