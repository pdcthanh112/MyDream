import { IsString, IsEmail } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}