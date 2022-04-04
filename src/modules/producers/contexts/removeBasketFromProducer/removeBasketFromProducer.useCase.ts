import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProducerRepository } from '@modules/producers/repository/producer.repository';

import { Producer } from '@shared/entities/producer/producer.entity';

import { BasketSize } from '@shared/entities/basket/basketSize.enum';

@Injectable()
export class RemoveBasketFromProducerUseCase {
  constructor(
    @InjectRepository(ProducerRepository)
    private readonly producerRepository: ProducerRepository,
  ) {}

  async execute(userID: string, basketSize: BasketSize): Promise<Producer> {
    const producer = await this.producerRepository.removeBasketFromProducer(
      userID,
      basketSize,
    );

    return producer;
  }
}
