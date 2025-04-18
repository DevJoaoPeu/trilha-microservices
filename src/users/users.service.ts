import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
  private readonly users: CreateUserDto[] = [];

  getAll(): CreateUserDto[] {
    return this.users;
  }

  create(dto: CreateUserDto): CreateUserDto {
    this.users.push(dto);
    return dto;
  }
}
