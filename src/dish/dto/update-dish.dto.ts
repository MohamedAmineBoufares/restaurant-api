import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { DishType } from 'src/utils/enums/index.enum';

export class UpdateDishDto {
  @IsOptional()
  @IsNotEmpty()
  dishPhoto?: string;

  @IsOptional()
  @IsNotEmpty()
  dishName?: string;

  @IsOptional()
  @IsNotEmpty()
  dishDescription?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(200)
  dishPrice?: number;

  @IsOptional()
  @IsEnum(DishType)
  dishType?: DishType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  dishRating?: number;
}
