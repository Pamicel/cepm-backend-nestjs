import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateDeathDto } from './dto/create-death.dto';
import { UpdateDeathDto } from './dto/update-death.dto';
import { Death } from './entities/death.entity';
import { CrossingsService } from '../crossings/crossings.service';
import { DeathForm } from 'src/death-form/entities/death-form.entity';
import { DeathFormService } from 'src/death-form/death-form.service';
import { CreateDeathFormDto } from 'src/death-form/dto/create-death-form.dto';
import { UpdateDeathFormDto } from 'src/death-form/dto/update-death-form.dto';
import { Crossing } from 'src/crossings/entities/crossing.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DeathService {
  constructor(
    @InjectRepository(Death)
    private deathRepository: Repository<Death>,
    private deathFormService: DeathFormService,
    private usersService: UsersService,
    private crossingsService: CrossingsService,
  ) {}

  async create(createDeathDto: CreateDeathDto): Promise<Death> {
    const { crossingId, userId, isSimulation } = createDeathDto;

    const crossing: Crossing = crossingId
      ? await this.crossingsService.findOne(crossingId)
      : undefined;

    let user: Partial<User>;
    try {
      // Create an empty user if no userid given (throws if userid does not exist)
      user = userId ? await this.usersService.findOne(userId) : {};
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

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

    if ((!isSimulation && !crossing) || (isSimulation && crossing)) {
      throw new HttpException(
        'Death can either have crossing or be a simulation but not both',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (crossing) {
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
    }

    // Find user's simulated death
    const deathSimulation: Death = await this.deathRepository.findOne({
      where: { isSimulation: true, user },
      relations: ['deathForm'],
    });

    // Throw if creating a simulation and user already has a simulation
    if (deathSimulation && isSimulation) {
      throw new HttpException(
        'User already has a death simulation',
        HttpStatus.CONFLICT,
      );
    }

    // Create the death
    const death = this.deathRepository.create({
      user,
      crossing,
      isSimulation,
      dateCreated: new Date().toISOString(),
    });

    // If simulation exists, automatically copy the form from it (if it has one)
    if (deathSimulation) {
      const deathFormCopy: DeathForm = deathSimulation.deathForm
        ? await this.deathFormService.copy(deathSimulation.deathForm, death)
        : undefined;

      if (deathFormCopy) {
        // add copied form to the new death
        death.deathForm = deathFormCopy;
      }
    }

    // Save
    return this.deathRepository.save(death);
  }

  findAll(options?: FindManyOptions): Promise<Death[]> {
    return this.deathRepository.find(options);
  }

  findOne(id: number): Promise<Death> {
    return this.deathRepository.findOneOrFail(id);
  }

  findByCrossing(crossingId: number): Promise<Death[]> {
    return this.findAll({
      where: { crossing: { id: crossingId } },
      loadRelationIds: { relations: ['user', 'crossing'] },
      relations: ['deathForm'],
    });
  }

  findByUser(userId: number): Promise<Death[]> {
    return this.findAll({
      where: { user: { id: userId } },
      loadRelationIds: { relations: ['user', 'crossing'] },
      relations: ['deathForm'],
    });
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

  // Forms

  async createForm(id: number, dto: CreateDeathFormDto) {
    const death = await this.findOne(id);
    if (death.deathForm) {
      throw new HttpException('Only one form per death', HttpStatus.CONFLICT);
    }
    return this.deathFormService.create(death, dto);
  }

  async updateForm(id: number, dto: UpdateDeathFormDto) {
    const death = await this.findOne(id);
    const deathFormId = death.deathForm?.id;
    if (!deathFormId) {
      throw new HttpException(
        'Death does not have a form',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.deathFormService.update(deathFormId, dto);
  }
}
