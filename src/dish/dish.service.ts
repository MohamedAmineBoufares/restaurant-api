import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDishDto } from './dto/create-dish.dto';
import { Dishes, DishesDocument } from './models/dish.schema';

@Injectable()
export class DishService {
  constructor(
    @InjectModel(Dishes.name)
    private dishModel: Model<DishesDocument>,
  ) {}

  async getDishes(): Promise<Dishes[]> {
    try {
      const createdDish = await this.dishModel.find();

      return createdDish;
    } catch (error) {
      console.log(error);

      throw new BadRequestException("Can't get dishes");
    }
  }

  async createDish(createDishDto: CreateDishDto): Promise<Dishes> {
    try {
      const createdDish = await this.dishModel.create(createDishDto);

      return createdDish;
    } catch (error) {
      console.log(error);

      if (error.code === 11000) {
        throw new ConflictException('Dish already exists');
      }

      throw new BadRequestException("Can't create this dish");
    }
  }
}
