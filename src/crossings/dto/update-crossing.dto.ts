import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateCrossingDto } from './create-crossing.dto';

export class UpdateCrossingDto extends PartialType(CreateCrossingDto) {
  @IsBoolean()
  @IsOptional()
  archived: boolean;
}
