import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { RemovedFood } from '@shared/entities/removedFood/removedFood.entity';
import { Consumer } from '@shared/entities/consumer/consumer.entity';

import { unexpected } from '@shared/constants/errors';

@EntityRepository(RemovedFood)
export class RemovedFoodsRepository extends Repository<RemovedFood> {
  async deleteRemovedFoods(consumerID: Consumer): Promise<RemovedFood[]> {
    try {
      const deleteds = await this.delete({ consumerID });
      return deleteds.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async setRemovedFood(removedFoods: RemovedFood[]): Promise<RemovedFood[]> {
    try {
      const removedFood = this.create(removedFoods);
      return await this.save(removedFood);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getAllRemovedFoods(consumerID: string): Promise<RemovedFood[]> {
    try {
      return await this.find({
        where: { consumerID: { userID: { id: consumerID } } },
        relations: ['foodID'],
      });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getRemovedFood(
    consumerID: Consumer,
    foodID: string,
  ): Promise<RemovedFood> {
    try {
      const removedFood = this.findOne({
        where: { consumerID, foodID: { id: foodID } },
      });
      return await removedFood;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
