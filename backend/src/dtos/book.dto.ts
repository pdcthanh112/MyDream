import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {

  @IsString()
  id: string

  @IsString()
  book_name: string

  category: string

  sub_catetory: string

  author: string

  @IsInt()
  quantity: number

  @IsNumber()
  price: number

  series: string

  publisher: string

  country: string

  sold: number

  rating: number

  image: string

  status: string
}
