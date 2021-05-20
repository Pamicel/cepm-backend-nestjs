import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // private authService: AuthService,
  ) {}

  async create({
    email,
    password,
  }: {
    email: string;
    password?: string;
  }): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ email });
    if (existingUser) {
      throw new HttpException('Email already used', HttpStatus.CONFLICT);
    }
    const dateCreated = new Date().toISOString();
    const newUser = this.usersRepository.create({
      email,
      password,
      dateCreated,
    });
    return this.usersRepository.save(newUser);
  }

  async userExists({ email }: { email: string }): Promise<User | null> {
    try {
      return this.findOneByEmail(email);
    } catch (error) {
      return null;
    }
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

  async deleteUser(id: number, deleterPermissionLevel: number): Promise<User> {
    const user = await this.findOne(id);
    if (user.permissionLevel === 4) {
      throw new HttpException(
        'Cannot delete admin user',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user.permissionLevel > deleterPermissionLevel) {
      throw new HttpException(
        'Cannot delete user with higher permission level',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.usersRepository.remove(user);
  }

  async updateUser(id: number, { email }: { email: string }): Promise<User> {
    const user = await this.findOne(id);
    user.email = email;
    return this.usersRepository.save(user);
  }

  async updateUserMagicToken(
    id: number,
    { magicToken }: { magicToken: string },
  ): Promise<User> {
    const user = await this.findOne(id);
    user.tokenIssued = new Date().toISOString();
    user.magicToken = magicToken;
    return this.usersRepository.save(user);
  }

  async updateUserPermission(
    id: number,
    { permissionLevel }: { permissionLevel: number },
  ): Promise<User> {
    const user = await this.findOne(id);
    user.permissionLevel = permissionLevel;
    return this.usersRepository.save(user);
  }
}
