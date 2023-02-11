import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type DishesDocument = HydratedDocument<Dishes>;

@Schema()
export class Dishes {
  @Prop({ required: true })
  dishPhoto: string;

  @Prop({ required: true, unique: true })
  dishName: string;

  @Prop({ required: true })
  dishDescription: string;

  @Prop({ required: true })
  dishPrice: number;

  @Prop({ required: true, min: 0, max: 5 })
  dishRating: number;
}

export const DishesSchema = SchemaFactory.createForClass(Dishes);
