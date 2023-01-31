import { Controller, Post, Body, Get } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { Dishes } from './models/dish.schema';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  async getDishes(): Promise<Dishes[]> {
    return this.dishService.getDishes();
  }

  @Post()
  async createDish(@Body() createDishDto: CreateDishDto): Promise<Dishes> {
    return this.dishService.createDish(createDishDto);
  }
}
