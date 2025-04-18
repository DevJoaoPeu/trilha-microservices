import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/create.user.dto';
import { ApiBody } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  getAll(): Promise<UserEntity[]> {
    return this.usersService.getAll();
  }

  @Post('/create')
  @ApiBody({ type: UserDto })
  create(@Body() users: UserDto): Promise<UserEntity> {
    return this.usersService.create(users);
  }
}
