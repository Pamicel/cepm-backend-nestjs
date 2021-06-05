import { IsEmail, IsLowercase, IsNotEmpty } from 'class-validator';

export class PasswordLoginDto {
  @IsEmail()
  @IsLowercase()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class MagicLoginDto {
  @IsEmail()
  @IsLowercase()
  email: string;

  @IsNotEmpty()
  magicToken: string;
}
