import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateDishDto {
  @IsNotEmpty()
  dishPhoto: string;

  @IsNotEmpty()
  dishName: string;

  @IsNotEmpty()
  dishDescription: string;

  @IsNumber()
  @Min(0)
  @Max(200)
  dishPrice: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  dishRating: number;
}
