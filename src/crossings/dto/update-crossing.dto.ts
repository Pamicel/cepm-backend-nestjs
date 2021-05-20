import { PartialType } from '@nestjs/swagger';
import { IsDateString, IsNumber, Min } from 'class-validator';
import { CreateCrossingDto } from './create-crossing.dto';

export class UpdateCrossingDto extends PartialType(CreateCrossingDto) {
  @IsDateString()
  startDate: string;

  @IsNumber()
  @Min(0)
  duration: number;

  @IsNumber()
  @Min(1)
  audienceSize: number;
}
