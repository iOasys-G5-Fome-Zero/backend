import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateFoodController } from '@modules/foods/contexts/createFood/createFood.controller';
import { DeleteFoodController } from '@modules/foods/contexts/deleteFood/deleteFood.controller';
import { GetFoodsController } from '@modules/foods/contexts/getFoods/getFoods.controller';
import { AddFoodToBasketController } from '@modules/foods/contexts/addFoodToBasket/addFoodToBasket.controller';
import { RemoveFoodFromBasketController } from '@modules/foods/contexts/removeFoodFromBasket/removeFoodFromBasket.controller';

import { CreateFoodUseCase } from '@modules/foods/contexts/createFood/createFood.useCase';
import { DeleteFoodUseCase } from '@modules/foods/contexts/deleteFood/deleteFood.useCase';
import { GetFoodsUseCase } from '@modules/foods/contexts/getFoods/getFoods.useCase';
import { AddFoodToBasketUseCase } from '@modules/foods/contexts/addFoodToBasket/addFoodToBasket.useCase';
import { RemoveFoodFromBasketUseCase } from '@modules/foods/contexts/removeFoodFromBasket/removeFoodFromBasket.useCase';

import { FoodRepository } from '@modules/foods/repository/food.repository';
import { BasketFoodRepository } from '@modules/foods/repository/basketFoods.repository';
import { BasketRepository } from '@modules/baskets/repository/basket.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FoodRepository,
      BasketFoodRepository,
      BasketRepository,
    ]),
  ],
  providers: [
    CreateFoodUseCase,
    DeleteFoodUseCase,
    GetFoodsUseCase,
    AddFoodToBasketUseCase,
    RemoveFoodFromBasketUseCase,
  ],
  controllers: [
    CreateFoodController,
    DeleteFoodController,
    GetFoodsController,
    AddFoodToBasketController,
    RemoveFoodFromBasketController,
  ],
})
export class FoodModule {}
