import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BasketRepository } from '@modules/baskets/repository/basket.repository';
import { ConsumerRepository } from '@modules/consumers/repository/consumer.repository';
import { ProducerRepository } from '@modules/producers/repository/producer.repository';

import { Consumer } from '@shared/entities/consumer/consumer.entity';

import { notFound } from '@shared/constants/errors';

@Injectable()
export class AssignBasketToConsumerUseCase {
  constructor(
    @InjectRepository(BasketRepository)
    private readonly basketRepository: BasketRepository,
    @InjectRepository(ConsumerRepository)
    private readonly consumerRepository: ConsumerRepository,
    @InjectRepository(ProducerRepository)
    private readonly producerRepository: ProducerRepository,
  ) {}

  async execute(
    userID: string,
    basketID: string,
    producerID: string,
  ): Promise<Consumer> {
    const basket = await this.basketRepository.findBasketById(basketID);

    if (!basket) throw new ConflictException(notFound('basket'));

    const producer = await this.producerRepository.getProducerById(producerID);

    if (!producer) throw new ConflictException(notFound('producer'));

    const producerBaskets = await this.producerRepository.getProducerBaskets(
      producerID,
    );

    const producerHasBasket = Object.values(producerBaskets).some(
      (basket) => basket?.id === basketID,
    );

    if (!producerHasBasket)
      throw new ConflictException('producer-basket-not-match');

    const consumer = await this.consumerRepository.assignBasketToConsumer(
      userID,
      basket,
      producer,
    );

    return consumer;
  }
}
