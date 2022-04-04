import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProducerRepository } from '@modules/producers/repository/producer.repository';

import { Producer } from '@shared/entities/producer/producer.entity';

import { BasketSize } from '@shared/entities/basket/basketSize.enum';
import { BasketRate } from '@shared/entities/basket/basketRate.enum';

@Injectable()
export class GetProducersBasketsUseCase {
  constructor(
    @InjectRepository(ProducerRepository)
    private readonly producerRepository: ProducerRepository,
  ) {}

  async execute(
    size: BasketSize,
    daysPerDeliver: BasketRate,
  ): Promise<Producer[]> {
    const producersBaskets = await this.producerRepository.getProducersBaskets(
      size,
      daysPerDeliver,
    );

    return producersBaskets;
  }
}
