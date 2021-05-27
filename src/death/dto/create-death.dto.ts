import { IsBoolean, IsNumber, IsOptional, ValidateIf } from 'class-validator';

export class CreateDeathDto {
  @ValidateIf((o: CreateDeathDto) => !o.crossingId)
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsBoolean()
  isSimulation?: boolean;

  @ValidateIf((o: CreateDeathDto) => o.isSimulation === false)
  @IsNumber()
  crossingId?: number;
}
