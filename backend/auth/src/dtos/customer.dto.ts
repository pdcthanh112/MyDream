import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber, IsNumber } from 'class-validator';

export class CustomerLoginDTO {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  public password: string;
}

export class CustomerSignupDTO {
  @IsEmail()
  public email: string;

  accountId?: string;

  public name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsPhoneNumber()
  public phone: string;

  public address: string;
  public dob?: Date;
  public gender: string;
  public image?: string;

}
export class UpdateCustomerDTO {
  public name: string;

  @IsPhoneNumber()
  public phone: string;

  public address: string;
  public department: string;
  public dob: Date;
  public gender: string;
  public image: string;
  
  @IsNumber()
  public salary: number

}
