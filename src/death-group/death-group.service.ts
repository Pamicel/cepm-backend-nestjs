import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDeathGroupDto } from './dto/create-death-group.dto';
import { AddDeathsToGroupDto } from './dto/add-deaths-to-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeathGroup } from './entities/death-group.entity';
import { CrossingsService } from '../crossings/crossings.service';
import { Death } from '../death/entities/death.entity';
import { DeathService } from 'src/death/death.service';

@Injectable()
export class DeathGroupService {
  constructor(
    @InjectRepository(DeathGroup)
    private deathGroupRepository: Repository<DeathGroup>,
    @InjectRepository(Death)
    private deathRepository: Repository<Death>,
    private deathService: DeathService,
    private crossingService: CrossingsService,
  ) {}

  private async getDeathsIfValid(
    deathIds: number[],
    crossingId: number,
  ): Promise<Death[]> {
    const deathList = await this.deathRepository
      .createQueryBuilder('death')
      .where('death.id IN (:...deathIds)', { deathIds })
      .andWhere('death.group IS NULL')
      .andWhere('death.crossingId = :crossingId', {
        crossingId,
      })
      .getMany();

    if (deathList.length !== deathIds.length) {
      throw new HttpException(
        'Some deaths could not be found, or already have a group, or belong to a different crossing',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return deathList;
  }

  async create(createDeathGroupDto: CreateDeathGroupDto): Promise<DeathGroup> {
    const { deathIds, crossingId, deathsToCreate } = createDeathGroupDto;

    const newDeaths: Death[] = [];
    try {
      if (deathsToCreate) {
        for (const deathDto of deathsToCreate) {
          newDeaths.push(await this.deathService.create(deathDto));
        }
      }
    } catch (error) {
      console.error(error);
      // In case of error, erase all deaths created
      for (const death of newDeaths) {
        await this.deathService.remove(death.id);
      }
    }

    const deathList = await this.getDeathsIfValid(deathIds, crossingId);
    const crossing = await this.crossingService.findOne(crossingId);
    const newDeathGroup = this.deathGroupRepository.create({
      crossing,
      deaths: [...deathList, ...newDeaths],
    });

    return this.deathGroupRepository.save(newDeathGroup);
  }

  findAll(crossingId?: number): Promise<DeathGroup[]> {
    if (crossingId) {
      return this.deathGroupRepository.find({ where: { crossingId } });
    }

    return this.deathGroupRepository.find();
  }

  findOne(id: number) {
    return this.deathGroupRepository.findOneOrFail(id);
  }

  async addDeaths(id: number, addDeathsToGroupDto: AddDeathsToGroupDto) {
    const { deathIds } = addDeathsToGroupDto;

    const group = await this.deathGroupRepository.findOneOrFail(id, {
      relations: ['crossing'],
    });

    const deathList = await this.getDeathsIfValid(deathIds, group.crossing.id);
    if (deathList.length !== deathIds.length) {
      throw new HttpException(
        'Some deaths do not belong to the correct crossing',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Update deaths in group
    group.deaths = [...group.deaths, ...deathList];
    return this.deathGroupRepository.save(group);
  }

  async remove(id: number): Promise<DeathGroup> {
    const group = await this.deathGroupRepository.findOneOrFail(id);
    return this.deathGroupRepository.remove(group);
  }
}
