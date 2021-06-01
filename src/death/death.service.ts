import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateDeathDto } from './dto/create-death.dto';
import { UpdateDeathDto } from './dto/update-death.dto';
import { Death } from './entities/death.entity';
import { DeathForm } from '../death-form/entities/death-form.entity';
import { DeathFormService } from '../death-form/death-form.service';
import { CreateDeathFormDto } from '../death-form/dto/create-death-form.dto';
import { UpdateDeathFormDto } from '../death-form/dto/update-death-form.dto';
import { Crossing } from '../crossings/entities/crossing.entity';
import { User } from '../users/entities/user.entity';
import { crossingIdWords, deathIdcWords } from './id-words';

@Injectable()
export class DeathService {
  constructor(
    @InjectRepository(Death)
    private deathRepository: Repository<Death>,
    @InjectRepository(Crossing)
    private crossingRepository: Repository<Crossing>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private deathFormService: DeathFormService,
  ) {}

  async create(createDeathDto: CreateDeathDto): Promise<Death> {
    const { crossingId, userId, isSimulation } = createDeathDto;

    const crossing: Crossing = crossingId
      ? await this.crossingRepository.findOneOrFail(crossingId)
      : undefined;

    let user: Partial<User>;
    try {
      // Create an empty user if no userid given (throws if userid does not exist)
      user = userId ? await this.userRepository.findOneOrFail(userId) : {};
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
    const savedDeath = await this.deathRepository.save(death);

    // assign idc if necessary
    await this.deathRepository.query(
      `
      UPDATE
        death AS d
      SET
        idc = ( SELECT count(id) + 1 FROM death WHERE id < d.id AND crossingId = d.crossingId )
      WHERE isSimulation = FALSE AND id = ?
      `,
      [savedDeath.id],
    );

    return savedDeath;
  }

  findAll(options?: FindManyOptions): Promise<Death[]> {
    return this.deathRepository.find(options);
  }

  findOne(id: number): Promise<Death> {
    return this.deathRepository.findOneOrFail(id);
  }

  findOneByIDC(
    deathIDC: number,
    crossingId: number,
    deathIdcWord: string,
    crossingIdWord: string,
  ): Promise<Death> {
    try {
      if (deathIdcWords[deathIDC - 1] !== deathIdcWord) {
        throw new Error('wrong word');
      }

      if (
        crossingIdWords[(crossingId - 1) % crossingIdWords.length] !==
        crossingIdWord
      ) {
        throw new Error('wrong word');
      }

      return this.deathRepository.findOneOrFail({
        where: { idc: deathIDC, crossing: { id: crossingId } },
        relations: ['user'],
      });
    } catch (error) {
      throw new HttpException(
        'Invalid death number or word',
        HttpStatus.NOT_FOUND,
      );
    }
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

  async createFirstForm(userId: number, dto: CreateDeathFormDto) {
    const death = await this.create({ userId, isSimulation: true });
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
