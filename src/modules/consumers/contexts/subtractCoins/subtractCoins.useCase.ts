import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ConsumerRepository } from '@modules/consumers/repository/consumer.repository';

import { Consumer } from '@shared/entities/consumer/consumer.entity';

@Injectable()
export class SubtractCoinsUseCase {
  constructor(
    @InjectRepository(ConsumerRepository)
    private readonly consumerRepository: ConsumerRepository,
  ) {}

  async execute(consumerID: string, coins: number): Promise<Consumer> {
    const consumer = await this.consumerRepository.handleCoins(
      consumerID,
      -coins,
    );

    return consumer;
  }
}
