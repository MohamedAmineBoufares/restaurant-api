import { IsEnum, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { DishType } from 'src/utils/enums/index.enum';

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

  @IsEnum(DishType)
  dishType: DishType;

  @IsNumber()
  @Min(0)
  @Max(5)
  dishRating: number;
}
