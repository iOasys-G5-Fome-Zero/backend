import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { ConsumerRepository } from '@modules/consumers/repository/consumer.repository';
import { Consumer } from '@shared/entities/consumer/consumer.entity';

@Injectable()
export class GetConsumerUseCase {
  constructor(
    // @Inject('CRYPTO_PROVIDER')
    // private readonly crypto: CryptoProvider,
    @InjectRepository(ConsumerRepository)
    private readonly consumerRepository: ConsumerRepository,
  ) {}

  async getConsumerById(id: string): Promise<Consumer> {
    const consumer = this.consumerRepository.getConsumerById(id);
    return consumer;
  }
}
