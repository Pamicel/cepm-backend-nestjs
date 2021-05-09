import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userssRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userssRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userssRepository.findOne(id);
  }

  // async update(id: number, updateUsersDto: UpdateUsersDto): Promise<Users> {
  //   return `This action updates a #${id} users`;
  // }

  async remove(id: number): Promise<void> {
    await this.userssRepository.delete(id);
  }
}
