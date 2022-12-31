import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateAccountDto {

  @IsString()
  public id: string;

  @IsString()
  public accountId: string;

  @IsString()
  public employeeCode: string;

  @IsString()
  public surName: string;

  public middleName: string;

  @IsString()
  public givenName: string;

  public dateOfBirth: Date;

  @IsInt()
  public departmentId: number;

  @IsInt()
  public positionId: number;

  public phoneNumber: string;

  public address: string;

}
