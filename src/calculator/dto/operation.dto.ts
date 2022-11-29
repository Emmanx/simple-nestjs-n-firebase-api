import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OperationpDto {
  @IsString()
  @IsNotEmpty()
  equation: string;

  @IsOptional()
  @IsString()
  description: string;
}
