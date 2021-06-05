import { PartialType } from '@nestjs/swagger';
import { CreateDeathFormDto } from './create-death-form.dto';

export class UpdateDeathFormDto extends PartialType(CreateDeathFormDto) {}
