import { IsEmail, IsLowercase } from 'class-validator';

export class RequestMagicTokenDto {
  @IsEmail()
  @IsLowercase()
  email: string;
}
