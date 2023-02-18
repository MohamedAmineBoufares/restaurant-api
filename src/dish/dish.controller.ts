import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { Dishes } from './schemas/dish.schema';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  async getDishes(): Promise<Dishes[]> {
    return this.dishService.getDishes();
  }

  @Get(':id')
  async getDishById(@Param('id') id: string): Promise<Dishes> {
    return this.dishService.getDishById(id);
  }

  @Post()
  async createDish(@Body() createDishDto: CreateDishDto): Promise<Dishes> {
    return this.dishService.createDish(createDishDto);
  }

  @Delete(':id')
  async deleteDish(@Param('id') id: string): Promise<string> {
    return this.dishService.deleteDish(id);
  }
}
