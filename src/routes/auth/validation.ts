import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserValidation {
  @IsEmail()
  email: string;

  @Length(8, 255)
  password: string;

  @IsNotEmpty()
  name: string;
}

export class TokenValidation {
  @IsNotEmpty()
  token: string;
}
