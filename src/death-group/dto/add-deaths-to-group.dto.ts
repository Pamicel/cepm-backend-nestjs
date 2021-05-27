import { IsInt } from 'class-validator';

export class AddDeathsToGroupDto {
  @IsInt({ each: true })
  deathIds: number[];
}
