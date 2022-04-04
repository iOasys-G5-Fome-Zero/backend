import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ConsumerRepository } from '@modules/consumers/repository/consumer.repository';
import { BasketFoodRepository } from '@modules/foods/repository/basketFoods.repository';
import { RemovedFoodsRepository } from '@modules/consumers/repository/removedFoods.repository';

import { Consumer } from '@shared/entities/consumer/consumer.entity';

@Injectable()
export class AddCoinsUseCase {
  constructor(
    @InjectRepository(ConsumerRepository)
    private readonly consumerRepository: ConsumerRepository,
    @InjectRepository(BasketFoodRepository)
    private readonly basketFoodRepository: BasketFoodRepository,
    @InjectRepository(RemovedFoodsRepository)
    private readonly removedFoodsRepository: RemovedFoodsRepository,
  ) {}

  async execute(consumerID: string): Promise<Consumer> {
    const consumerBasket = await this.consumerRepository.getConsumerBaskets(
      consumerID,
    );

    const basketFoods = await this.basketFoodRepository.listBasketFoods(
      consumerBasket.basketID,
    );

    const removedFoods = await this.removedFoodsRepository.getAllRemovedFoods(
      consumerID,
    );

    const totalWeight = basketFoods.reduce(
      (sum, basketFood) =>
        sum + basketFood.quantity * basketFood.foodID.priceWeight,
      0,
    );

    const coins = removedFoods.reduce(
      (sum, removedFood) =>
        sum +
        (removedFood.quantity *
          removedFood.foodID.priceWeight *
          consumerBasket.basketID.value) /
          totalWeight,
      0,
    );

    const consumer = await this.consumerRepository.handleCoins(
      consumerID,
      Math.round(coins),
    );

    return consumer;
  }
}
