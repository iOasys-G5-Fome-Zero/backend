import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BasketFoodRepository } from '@modules/foods/repository/basketFoods.repository';

import { BasketFood } from '@shared/entities/basketFood/basketFood.entity';
import { Basket } from '@shared/entities/basket/basket.entity';

@Injectable()
export class GetBasketFoodsUseCase {
  constructor(
    @InjectRepository(BasketFoodRepository)
    private readonly basketFoodRepository: BasketFoodRepository,
  ) {}

  async listBasketsFoods(id: Basket): Promise<BasketFood[]> {
    const basketFood = await this.basketFoodRepository.listBasketFoods(id);

    return basketFood;
  }
}
