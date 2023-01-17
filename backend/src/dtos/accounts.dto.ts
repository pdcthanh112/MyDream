import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateAccountDto {

  public id: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsInt()
  public role: number;

  public notificationToken: string;

  public status: string;
}
