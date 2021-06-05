import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCrossingDto } from './dto/create-crossing.dto';
import { UpdateCrossingDto } from './dto/update-crossing.dto';
import { Crossing } from './entities/crossing.entity';

@Injectable()
export class CrossingsService {
  constructor(
    @InjectRepository(Crossing)
    private crossingRepository: Repository<Crossing>,
  ) {}

  create(createCrossingDto: CreateCrossingDto) {
    const date = new Date(createCrossingDto.startDate);
    date.setMilliseconds(0);
    date.setSeconds(0);
    const crossingObj = {
      ...createCrossingDto,
      startDate: date.toISOString(),
    };
    const crossing = this.crossingRepository.create(crossingObj);
    return this.crossingRepository.save(crossing);
  }

  async findAll(): Promise<Crossing[]> {
    return this.crossingRepository.find();
  }

  async findAllOpen(): Promise<Crossing[]> {
    return this.crossingRepository.find({ where: { archived: false } });
  }

  async findAllArchived(): Promise<Crossing[]> {
    return this.crossingRepository.find({ where: { archived: true } });
  }

  async findOne(id: number): Promise<Crossing> {
    try {
      return this.crossingRepository.findOneOrFail(id);
    } catch (error) {
      throw new HttpException('Crossing does not exist', HttpStatus.NOT_FOUND);
    }
  }

  async update(
    id: number,
    updateCrossingDto: UpdateCrossingDto,
  ): Promise<Crossing> {
    const crossing = await this.findOne(id);

    return this.crossingRepository.save({
      ...crossing,
      ...updateCrossingDto,
    });
  }

  async remove(id: number): Promise<Crossing> {
    const user = await this.findOne(id);
    return this.crossingRepository.remove(user);
  }
}
