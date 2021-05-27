import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateDeathDto } from './dto/create-death.dto';
import { UpdateDeathDto } from './dto/update-death.dto';
import { Death } from './entities/death.entity';
import { CrossingsService } from '../crossings/crossings.service';
import { DeathForm } from 'src/death-form/entities/death-form.entity';

@Injectable()
export class DeathService {
  constructor(
    @InjectRepository(Death)
    private deathRepository: Repository<Death>,
    @InjectRepository(Death)
    private deathFormRepository: Repository<DeathForm>,
    private usersService: UsersService,
    private crossingsService: CrossingsService,
  ) {}

  async create(createDeathDto: CreateDeathDto): Promise<Death> {
    const { crossingId, userId /*, copyDeathForm*/ } = createDeathDto;
    const crossing = await this.crossingsService.findOne(crossingId);
    // Create an empty user if no userid given (throws if userid does not exist)
    const user = userId ? await this.usersService.findOne(userId) : {};
    // Check that user doesn't have a death on this crossing
    const userDeaths = await this.deathRepository.find({
      where: { user, crossing },
    });

    if (userDeaths.length !== 0) {
      throw new HttpException(
        'Only one death per crossing per user',
        HttpStatus.CONFLICT,
      );
    }

    // if (copyDeathForm) {
    //   const deathForm: DeathForm = await this.deathFormRepository.findOne({
    //     where: {
    //       death: {
    //         user,
    //       },
    //     },
    //   });
    // }

    const death = this.deathRepository.create({
      user,
      crossing,
      dateCreated: new Date().toISOString(),
    });

    return this.deathRepository.save(death);
  }

  findAll(options?: FindManyOptions): Promise<Death[]> {
    return this.deathRepository.find(options);
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
