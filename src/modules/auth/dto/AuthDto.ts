import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class LoginBodyDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterBodyDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterResponseDto {}

export class LoginResponseDto {}
