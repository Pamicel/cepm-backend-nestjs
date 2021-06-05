import { IsEmail, IsLowercase, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUsersDto {
  @IsEmail()
  @IsLowercase()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
