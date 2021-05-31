import { IsInt, IsNotEmpty } from 'class-validator';

export class LockAppDto {
  @IsInt()
  @IsNotEmpty()
  crossingId: number;
}
