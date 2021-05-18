import { IsEmail, IsNotEmpty } from 'class-validator';

export class PasswordLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class MagicLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  magicToken: string;
}
