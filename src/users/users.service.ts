import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ email });
    if (existingUser) {
      throw new HttpException('Email already used', HttpStatus.CONFLICT);
    }
    const newUser = this.usersRepository.create({ email, password });
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    if (!id) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    try {
      return this.usersRepository.findOneOrFail(id);
    } catch (error) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    if (!email) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    try {
      return this.usersRepository.findOneOrFail({ email });
    } catch (error) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }

  async updateUser(id: number, { email }: { email: string }): Promise<User> {
    const user = await this.findOne(id);
    user.email = email;
    return this.usersRepository.save(user);
  }
}
