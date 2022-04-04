import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ConsumerRepository } from '@modules/consumers/repository/consumer.repository';

import { Consumer } from '@shared/entities/consumer/consumer.entity';

@Injectable()
export class RemoveBasketFromConsumerUseCase {
  constructor(
    @InjectRepository(ConsumerRepository)
    private readonly consumerRepository: ConsumerRepository,
  ) {}

  async execute(userID: string): Promise<Consumer> {
    const consumer = await this.consumerRepository.removeBasketFromConsumer(
      userID,
    );

    return consumer;
  }
}
