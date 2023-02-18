import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Dishes, DishesSchema } from './schemas/dish.schema';
import { DishService } from './dish.service';
import { DishesController } from './dish.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dishes.name, schema: DishesSchema }]),
  ],
  controllers: [DishesController],
  providers: [DishService],
})
export class RestaurantModule {}
