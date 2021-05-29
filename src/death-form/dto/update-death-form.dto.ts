import { PartialType } from '@nestjs/swagger';
import { CreateDeathFormDto } from './create-death-form.dto';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateDeathFormDto extends PartialType(CreateDeathFormDto) {
  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  @IsString()
  birthPlace?: string;

  @IsOptional()
  @IsString()
  afterLife?: string;

  @IsOptional()
  @IsString()
  afterLifeMore?: string;

  @IsOptional()
  @IsBoolean()
  grievances?: boolean;

  @IsOptional()
  @IsString()
  grievancesDetails?: string;

  @IsOptional()
  @IsString()
  job?: string;

  @IsOptional()
  @IsBoolean()
  pet?: boolean;

  @IsOptional()
  @IsString()
  petDetails?: string;

  @IsOptional()
  @IsString({ each: true })
  importantPeopleRoles?: string[];

  @IsOptional()
  @IsString({ each: true })
  importantPeopleNames?: string[];

  @IsOptional()
  @IsString()
  crossingType?: string;

  @IsOptional()
  @IsString()
  intimate?: string;

  @IsOptional()
  @IsString()
  public?: string;

  @IsOptional()
  @IsString()
  captcha?: string;

  @IsOptional()
  @IsString()
  song?: string;

  @IsOptional()
  @IsBoolean()
  dream?: boolean;

  @IsOptional()
  @IsString()
  dreamDetails?: string;

  @IsOptional()
  @IsBoolean()
  enemy?: boolean;

  @IsOptional()
  @IsString()
  enemyDetails?: string;

  @IsOptional()
  @IsBoolean()
  remorse?: boolean;

  @IsOptional()
  @IsString()
  remorseDetails?: string;

  @IsOptional()
  @IsBoolean()
  imageRights?: boolean;

  @IsOptional()
  @IsString()
  iVoteFor?: string;
}
