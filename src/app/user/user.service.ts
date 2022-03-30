import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateUser) {
      return await this.userRepository.save(this.userRepository.create(data));
  }

  async update(id: string, data: UpdateUser) {
      const crud = await this.findOne(id);
      this.userRepository.merge(crud, data);
      return this.userRepository.save(crud);
  }

  async deleteById(id: string) {
      await this.findOne(id);
      return await this.userRepository.delete(id)
  }
}
