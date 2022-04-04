import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidV4 } from 'uuid';

import { RemovedFoodsRepository } from '@modules/consumers/repository/removedFoods.repository';

import { RemovedFood } from '@shared/entities/removedFood/removedFood.entity';
import { Food } from '@shared/entities/food/food.entity';
import { Consumer } from '@shared/entities/consumer/consumer.entity';
import { User } from '@shared/entities/user/user.entity';

import { SetRemovedFoodDTO } from '@shared/dtos/removedFood/setRemovedFood.dto';

@Injectable()
export class SetRemovedFoodUseCase {
  constructor(
    @InjectRepository(RemovedFoodsRepository)
    private readonly removedFoodsRepository: RemovedFoodsRepository,
  ) {}

  async setRemovedFood(
    consumerID: string,
    setRemovedFoodDTO: SetRemovedFoodDTO[],
  ): Promise<RemovedFood[]> {
    const removedFoods: RemovedFood[] = [];

    const user = new User();
    user.id = consumerID;
    const consumer = new Consumer();
    consumer.userID = user;

    await Promise.all(
      setRemovedFoodDTO.map(async (item) => {
        const existingRemovedFood =
          await this.removedFoodsRepository.getRemovedFood(
            consumer,
            item.foodID,
          );
        const removedFoodID = existingRemovedFood?.id || uuidV4();
        const foodID = new Food();
        foodID.id = item.foodID;
        const removedFood = {
          id: removedFoodID,
          consumerID: consumer,
          foodID,
          quantity: item.quantity,
        };
        removedFoods.push(removedFood);
      }),
    );

    const response = await this.removedFoodsRepository.setRemovedFood(
      removedFoods,
    );

    return response;
  }
}
