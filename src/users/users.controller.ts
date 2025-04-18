import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  getAll(): CreateUserDto[] {
    return this.usersService.getAll();
  }

  @Post('/create')
  create(@Body() users: CreateUserDto): CreateUserDto {
    return this.usersService.create(users);
  }
}
