import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UserResponseDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Exclude()
  password: string;
}

export class UpdateUserBodyDto {
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password: string;
}
