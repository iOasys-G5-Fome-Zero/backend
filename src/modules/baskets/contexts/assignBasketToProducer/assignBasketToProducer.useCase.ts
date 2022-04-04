import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BasketRepository } from '@modules/baskets/repository/basket.repository';
import { ProducerRepository } from '@modules/producers/repository/producer.repository';

import { Producer } from '@shared/entities/producer/producer.entity';

import { notFound } from '@shared/constants/errors';

@Injectable()
export class AssignBasketToProducerUseCase {
  constructor(
    @InjectRepository(BasketRepository)
    private readonly basketRepository: BasketRepository,
    @InjectRepository(ProducerRepository)
    private readonly producerRepository: ProducerRepository,
  ) {}

  async execute(userID: string, basketID: string): Promise<Producer> {
    const basket = await this.basketRepository.findBasketById(basketID);

    if (!basket) throw new ConflictException(notFound('basket'));

    const producer = await this.producerRepository.assignBasketToProducer(
      userID,
      basket,
      basket.size,
    );

    return producer;
  }
}
