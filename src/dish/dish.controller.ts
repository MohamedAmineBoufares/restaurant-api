import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dishes } from './schemas/dish.schema';

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

  @Get('/by-dishtype')
  async getDishesByDishType(@Query('type') type: string[]): Promise<Dishes[]> {
    return this.dishService.getDishesByDishType(type);
  }

  @Get('/search')
  async searchDishByName(@Query('name') name: string): Promise<Dishes[]> {
    return this.dishService.searchDishByName(name);
  }

  @Get(':id')
  async getDishById(@Param('id') id: string): Promise<Dishes> {
    return this.dishService.getDishById(id);
  }

  @Put(':id')
  async updateDish(
    @Param('id') id: string,
    @Body() updateDishDto: UpdateDishDto,
  ): Promise<Dishes> {
    return this.dishService.updateDish(id, updateDishDto);
  }

  @Delete(':id')
  async deleteDish(@Param('id') id: string): Promise<string> {
    return this.dishService.deleteDish(id);
  }
}
