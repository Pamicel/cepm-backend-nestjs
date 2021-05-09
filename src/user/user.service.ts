import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  // async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  //   return `This action updates a #${id} user`;
  // }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
