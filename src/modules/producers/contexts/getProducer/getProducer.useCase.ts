import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { ProducerRepository } from '@modules/producers/repository/producer.repository';
import { Producer } from '@shared/entities/producer/producer.entity';

@Injectable()
export class GetProducerUseCase {
  constructor(
    // @Inject('CRYPTO_PROVIDER')
    // private readonly crypto: CryptoProvider,
    @InjectRepository(ProducerRepository)
    private readonly producerRepository: ProducerRepository,
  ) {}

  async getProducerById(id: string): Promise<Producer> {
    const producer = this.producerRepository.getProducerById(id);
    return producer;
  }
}
