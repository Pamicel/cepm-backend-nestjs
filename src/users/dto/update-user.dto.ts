import { PartialType } from '@nestjs/mapped-types';
import { IsEmail } from 'class-validator';
import { CreateUsersDto } from './create-user.dto';

export class UpdateUsersDto extends PartialType(CreateUsersDto) {
  @IsEmail()
  email: string;
}
