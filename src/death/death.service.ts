import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CreateDeathDto } from './dto/create-death.dto';
import { UpdateDeathDto } from './dto/update-death.dto';
import { Death } from './entities/death.entity';
import { CrossingsService } from '../crossings/crossings.service';

@Injectable()
export class DeathService {
  constructor(
    @InjectRepository(Death)
    private deathRepository: Repository<Death>,
    private usersService: UsersService,
    private crossingsService: CrossingsService,
  ) {}

  async create(createDeathDto: CreateDeathDto): Promise<Death> {
    const { crossingId, userId } = createDeathDto;
    const crossing = await this.crossingsService.findOne(crossingId);
    // Create an empty user if no userid given (throws if userid does not exist)
    const user = userId ? await this.usersService.findOne(userId) : {};

    const death = this.deathRepository.create({
      user,
      crossing,
      dateCreated: new Date().toISOString(),
    });

    return this.deathRepository.save(death);
  }

  findAll(): Promise<Death[]> {
    return this.deathRepository.find();
  }

  findOne(id: number): Promise<Death> {
    return this.deathRepository.findOneOrFail(id);
  }

  async update(id: number, updateDeathDto: UpdateDeathDto): Promise<Death> {
    const death = await this.deathRepository.findOneOrFail(id);
    const newDeath = {
      ...death,
      ...updateDeathDto,
    };
    return this.deathRepository.save(newDeath);
  }

  async remove(id: number) {
    const death = await this.deathRepository.findOneOrFail(id);
    return this.deathRepository.remove(death);
  }
}
