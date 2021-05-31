import { IsInt, IsNotEmpty } from 'class-validator';

export class ImpersonateDto {
  @IsInt()
  @IsNotEmpty()
  deathIDC: number;

  @IsInt()
  @IsNotEmpty()
  crossingId: number;

  @IsNotEmpty()
  deathWord: string;

  @IsNotEmpty()
  crossingWord: string;
}
