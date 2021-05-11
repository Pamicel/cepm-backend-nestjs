import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUsersDto: CreateUsersDto): Promise<User> {
    const newUser = this.usersRepository.create(createUsersDto);
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  // async update(id: number, updateUsersDto: UpdateUsersDto): Promise<Users> {
  //   return `This action updates a #${id} users`;
  // }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
