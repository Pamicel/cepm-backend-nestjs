import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUsersDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
