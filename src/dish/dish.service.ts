import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dishes, DishesDocument } from './schemas/dish.schema';

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

  async getDishesByDishType(type: string[]): Promise<Dishes[]> {
    try {
      const foundDishes = await this.dishModel.find({ dishType: type });

      return foundDishes;
    } catch (error) {
      console.log(error);

      throw new BadRequestException("Can't get dishes");
    }
  }

  async getDishById(id: string): Promise<Dishes> {
    try {
      const foundDish = await this.dishModel.findById(id);

      if (!foundDish) {
        throw new NotFoundException();
      }

      return foundDish;
    } catch (error) {
      console.log(error);

      if (error.status === 404) {
        throw new NotFoundException(`Dish with id ${id} not found`);
      }

      throw new BadRequestException("Can't get dish");
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

  async updateDish(id: string, updateDishDto: UpdateDishDto): Promise<Dishes> {
    try {
      const updatedDish = await this.dishModel.findByIdAndUpdate(
        id,
        updateDishDto,
        { new: true },
      );

      if (!updatedDish) {
        throw new NotFoundException();
      }

      return updatedDish;
    } catch (error) {
      console.log(error);

      if (error.status === 404) {
        throw new NotFoundException(`Dish with id ${id} not found`);
      }

      throw new BadRequestException("Can't update this dish");
    }
  }

  async deleteDish(id: string): Promise<string> {
    try {
      const { deletedCount } = await this.dishModel.deleteOne({ _id: id });

      if (!deletedCount) {
        throw new NotFoundException();
      }

      return `dish with id ${id} deleted`;
    } catch (error) {
      console.log(error);

      if (error.status === 404) {
        throw new NotFoundException(`Dish with id ${id} not found`);
      }

      throw new BadRequestException("Can't delete this dish");
    }
  }

  async searchDishByName(name: string): Promise<Dishes[]> {
    try {
      const foundDishes = await this.dishModel.aggregate([
        {
          $search: {
            regex: {
              query: `${name}(.*)`,
              path: 'dishName',
              allowAnalyzedField: true,
            },
          },
        },
      ]);

      return foundDishes;
    } catch (error) {
      console.log(error);

      throw new BadRequestException("Can't get dishes");
    }
  }
}
