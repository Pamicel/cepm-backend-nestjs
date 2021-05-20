import { IsDateString, IsNumber, Min } from 'class-validator';

export class CreateCrossingDto {
  @IsDateString()
  startDate: string;

  @IsNumber()
  @Min(0)
  duration: number;

  @IsNumber()
  @Min(1)
  audienceSize: number;
}
