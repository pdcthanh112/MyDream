import { IsInt, IsString } from 'class-validator';

export class CreateRoleDto {

  @IsInt()
  public id: number;

  @IsString()
  public role: string;


}
