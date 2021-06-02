import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  answer: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  questionId: number;
}
