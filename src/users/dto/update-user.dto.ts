import { IsEmail, IsLowercase } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsLowercase()
  email: string;
}
