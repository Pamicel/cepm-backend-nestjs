import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateDeathDto {
  @IsNumber()
  @IsOptional()
  userId?: number;

  // @IsBoolean()
  // @IsOptional()
  // copyDeathForm?: boolean;

  @IsNotEmpty()
  @IsNumber()
  crossingId: number;
}
