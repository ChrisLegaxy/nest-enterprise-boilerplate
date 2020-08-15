import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
