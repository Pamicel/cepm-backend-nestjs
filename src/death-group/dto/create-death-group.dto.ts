import { IsInt, IsNotEmpty, ValidateIf } from 'class-validator';
import { CreateDeathDto } from 'src/death/dto/create-death.dto';

export class CreateDeathGroupDto {
  @ValidateIf((o) => !o.deathsToCreate || o.deathsToCreate.length === 0)
  @IsNotEmpty()
  @IsInt({ each: true })
  deathIds?: number[];

  @ValidateIf((o) => !o.deathIds || o.deathIds.length === 0)
  @IsNotEmpty()
  deathsToCreate?: CreateDeathDto[];

  @IsInt()
  @IsNotEmpty()
  crossingId: number;
}
