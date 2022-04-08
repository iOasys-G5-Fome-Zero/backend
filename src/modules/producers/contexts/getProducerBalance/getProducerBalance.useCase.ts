import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProducerRepository } from '@modules/producers/repository/producer.repository';
import { Producer } from '@shared/entities/producer/producer.entity';

@Injectable()
export class GetProducerBalanceUseCase {
  constructor(
    @InjectRepository(ProducerRepository)
    private readonly producerRepository: ProducerRepository,
  ) {}

  async execute(id: string): Promise<Producer> {
    const producerBalance = this.producerRepository.getProducerBalance(id);
    return producerBalance;
  }
}
