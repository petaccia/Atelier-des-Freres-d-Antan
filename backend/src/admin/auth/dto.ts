import { IsString, MinLength } from 'class-validator';

export class AdminAuthDto {
  @IsString()
  @MinLength(16)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}