import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ConsumerRepository } from '@modules/consumers/repository/consumer.repository';
import { Consumer } from '@shared/entities/consumer/consumer.entity';

@Injectable()
export class GetConsumerBasketUseCase {
  constructor(
    @InjectRepository(ConsumerRepository)
    private readonly consumerRepository: ConsumerRepository,
  ) {}

  async execute(id: string): Promise<Consumer> {
    const consumer = this.consumerRepository.getConsumerBaskets(id);
    return consumer;
  }
}
