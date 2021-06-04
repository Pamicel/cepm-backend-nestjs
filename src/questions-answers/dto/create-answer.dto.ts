import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  answer: string;

  @IsInt()
  @IsNotEmpty()
  deathId: number;

  @IsInt()
  @IsNotEmpty()
  questionId: number;
}
