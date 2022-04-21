import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ConsumerRepository } from '@modules/consumers/repository/consumer.repository';

import { Consumer } from '@shared/entities/consumer/consumer.entity';

@Injectable()
export class GetProducerSignedBasketsUseCase {
  constructor(
    @InjectRepository(ConsumerRepository)
    private readonly consumerRepository: ConsumerRepository,
  ) {}

  async execute(id: string): Promise<Consumer[]> {
    const producersignedBaskets =
      this.consumerRepository.geProducerSignedBaskets(id);
    return producersignedBaskets;
  }
}
