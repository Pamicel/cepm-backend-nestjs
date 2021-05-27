import { IsInt, IsOptional } from 'class-validator';
import { CreateDeathDto } from 'src/death/dto/create-death.dto';

export class CreateDeathGroupDto {
  @IsOptional()
  @IsInt({ each: true })
  deathIds: number[];

  @IsOptional()
  deathsToCreate: CreateDeathDto[];

  @IsInt()
  crossingId: number;
}
