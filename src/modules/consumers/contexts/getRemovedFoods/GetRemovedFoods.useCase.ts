import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RemovedFoodsRepository } from '@modules/consumers/repository/removedFoods.repository';

import { RemovedFood } from '@shared/entities/removedFood/removedFood.entity';
// import { Consumer } from '@shared/entities/consumer/consumer.entity';
// import { User } from '@shared/entities/user/user.entity';

@Injectable()
export class GetRemovedFoodsUseCase {
  constructor(
    @InjectRepository(RemovedFoodsRepository)
    private readonly removedFoodsRepository: RemovedFoodsRepository,
  ) {}

  async execute(consumerID: string): Promise<RemovedFood[]> {
    // const user = new User();
    // user.id = consumerID;
    // const consumer = new Consumer();
    // consumer.userID = user;

    const removedFoods = await this.removedFoodsRepository.getAllRemovedFoods(
      consumerID,
    );

    return removedFoods;
  }
}
