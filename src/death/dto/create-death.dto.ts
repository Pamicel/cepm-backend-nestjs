import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateDeathDto {
  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsNotEmpty()
  @IsNumber()
  crossingId: number;
}
