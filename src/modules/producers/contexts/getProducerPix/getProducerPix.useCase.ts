import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProducerRepository } from '@modules/producers/repository/producer.repository';
import { Producer } from '@shared/entities/producer/producer.entity';

@Injectable()
export class GetProducerPixUseCase {
  constructor(
    @InjectRepository(ProducerRepository)
    private readonly producerRepository: ProducerRepository,
  ) {}

  async execute(userID: string): Promise<Producer> {
    const producer = await this.producerRepository.getProducerPix(userID);
    return producer;
  }
}
