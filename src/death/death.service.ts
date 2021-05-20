import { Injectable } from '@nestjs/common';
import { CreateDeathDto } from './dto/create-death.dto';
import { UpdateDeathDto } from './dto/update-death.dto';

@Injectable()
export class DeathService {
  create(createDeathDto: CreateDeathDto) {
    return 'This action adds a new death';
  }

  findAll() {
    return `This action returns all death`;
  }

  findOne(id: number) {
    return `This action returns a #${id} death`;
  }

  update(id: number, updateDeathDto: UpdateDeathDto) {
    return `This action updates a #${id} death`;
  }

  remove(id: number) {
    return `This action removes a #${id} death`;
  }
}
