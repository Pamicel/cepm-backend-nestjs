import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeathFormDto } from './dto/create-death-form.dto';
import { UpdateDeathFormDto } from './dto/update-death-form.dto';
import { DeathForm } from './entities/death-form.entity';

@Injectable()
export class DeathFormService {
  constructor(
    @InjectRepository(DeathForm)
    private deathFormRepository: Repository<DeathForm>,
  ) {}

  async create(createDeathFormDto: CreateDeathFormDto): Promise<DeathForm> {
    const df = await this.deathFormRepository.create(createDeathFormDto);
    return this.deathFormRepository.save(df);
  }

  findAll() {
    return this.deathFormRepository.find();
  }

  findOne(id: number) {
    try {
      return this.deathFormRepository.findOneOrFail(id);
    } catch (error) {
      throw new HttpException(
        'Death form does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: number,
    updateDeathFormDto: UpdateDeathFormDto,
  ): Promise<DeathForm> {
    const df: Partial<DeathForm> = {
      ...(await this.deathFormRepository.findOneOrFail(id)),
      ...updateDeathFormDto,
    };

    return this.deathFormRepository.save(df);
  }

  async remove(id: number): Promise<DeathForm> {
    const df = await this.deathFormRepository.findOneOrFail(id);
    return this.deathFormRepository.remove(df);
  }
}
