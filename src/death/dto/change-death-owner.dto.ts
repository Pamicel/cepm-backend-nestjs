import { IsNumber } from 'class-validator';

export class ChangeDeathOwnerDto {
  @IsNumber()
  newOwnerId?: number;
}
