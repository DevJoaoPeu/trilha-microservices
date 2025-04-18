import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/create.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async create(dto: UserDto): Promise<UserEntity> {
    return await this.userRepository.save(dto);
  }
}
