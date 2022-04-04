import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidV4 } from 'uuid';

import { FoodRepository } from '@modules/foods/repository/food.repository';
import { BasketFoodRepository } from '@modules/foods/repository/basketFoods.repository';
import { BasketRepository } from '@modules/baskets/repository/basket.repository';

import { AddFoodToBasketRequestBodyDTO } from '@shared/dtos/basketFood/addFoodToBasketRequestBody.dto';

import { BasketFood } from '@shared/entities/basketFood/basketFood.entity';
import { notFound } from '@shared/constants/errors';

@Injectable()
export class AddFoodToBasketUseCase {
  constructor(
    @InjectRepository(FoodRepository)
    private readonly foodRepository: FoodRepository,
    @InjectRepository(BasketFoodRepository)
    private readonly basketFoodRepository: BasketFoodRepository,
    @InjectRepository(BasketRepository)
    private readonly basketRepository: BasketRepository,
  ) {}

  async execute({
    basketID,
    foodName,
    quantity,
  }: AddFoodToBasketRequestBodyDTO): Promise<BasketFood> {
    const registeredFood = await this.foodRepository.findFoodByName(foodName);
    if (!registeredFood) throw new ConflictException(notFound('food'));

    const registeredBasket = await this.basketRepository.findBasketById(
      basketID,
    );
    if (!registeredBasket) throw new ConflictException(notFound('basket'));

    const basketFood = await this.basketFoodRepository.addFoodToBasket({
      id: uuidV4(),
      basketID: registeredBasket,
      foodID: registeredFood,
      quantity,
    });

    return basketFood;
  }
}
