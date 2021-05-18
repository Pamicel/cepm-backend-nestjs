import { IsEmail } from 'class-validator';

export class RequestMagicTokenDto {
  @IsEmail()
  email: string;
}
