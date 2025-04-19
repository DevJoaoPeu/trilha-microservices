import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './interfaces/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async create(dto: UserDto): Promise<UserEntity> {
    return await this.userRepository.save(dto);
  }
}
