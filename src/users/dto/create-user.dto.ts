import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUsersDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
