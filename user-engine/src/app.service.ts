import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './interfaces/create.user.dto';

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

  async findOne(userId: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error();
    }

    const { id, name, email, password, phone } = user;

    const response: UserDto = {
      id,
      name,
      email,
      phone,
      password,
    };

    return response;
  }
}
