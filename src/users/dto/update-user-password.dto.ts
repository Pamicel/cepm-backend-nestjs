import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
  @IsNotEmpty()
  oldPassword: string;
}
