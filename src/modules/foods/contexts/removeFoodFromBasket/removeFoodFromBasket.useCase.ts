import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BasketFoodRepository } from '@modules/foods/repository/basketFoods.repository';
import { FoodRepository } from '@modules/foods/repository/food.repository';

import { BasketFood } from '@shared/entities/basketFood/basketFood.entity';
import { notFound } from '@shared/constants/errors';

@Injectable()
export class RemoveFoodFromBasketUseCase {
  constructor(
    @InjectRepository(BasketFoodRepository)
    private readonly basketFoodRepository: BasketFoodRepository,
    @InjectRepository(FoodRepository)
    private readonly foodRepository: FoodRepository,
  ) {}

  async execute(basketID: string, foodName: string): Promise<BasketFood> {
    const food = await this.foodRepository.findFoodByName(foodName);

    if (!food) throw new ConflictException(notFound('food'));

    const basketFood = await this.basketFoodRepository.removeFoodFromBasket(
      basketID,
      food.id,
    );

    return basketFood;
  }
}
