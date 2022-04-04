import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { BasketFood } from '@shared/entities/basketFood/basketFood.entity';
import { Basket } from '@shared/entities/basket/basket.entity';

import { AddFoodToBasketDTO } from '@shared/dtos/basketFood/addFoodToBasket.dto';

import { unexpected } from '@shared/constants/errors';

@EntityRepository(BasketFood)
export class BasketFoodRepository extends Repository<BasketFood> {
  async listBasketFoods(basketID: Basket): Promise<BasketFood[]> {
    try {
      return await this.find({ where: { basketID }, relations: ['foodID'] });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async addFoodToBasket(
    addFoodToBasketDTO: AddFoodToBasketDTO,
  ): Promise<BasketFood> {
    try {
      const foodBasket = this.create(addFoodToBasketDTO);
      return await this.save(foodBasket);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async removeFoodFromBasket(
    basketID: string,
    foodID: string,
  ): Promise<BasketFood | undefined> {
    try {
      const response = await this.createQueryBuilder()
        .delete()
        .from(BasketFood)
        .where('foodID = :foodID', { foodID })
        .andWhere('basketID = :basketID', { basketID })
        .returning('basket_id, food_id, quantity')
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
