import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { BuyerRepository } from '@modules/buyers/repository/buyer.repository';
import { Buyer } from '@shared/entities/buyer/buyer.entity';

@Injectable()
export class GetBuyerUseCase {
  constructor(
    // @Inject('CRYPTO_PROVIDER')
    // private readonly crypto: CryptoProvider,
    @InjectRepository(BuyerRepository)
    private readonly buyerRepository: BuyerRepository,
  ) {}

  async getBuyerById(id: string): Promise<Buyer> {
    const buyer = this.buyerRepository.getBuyerById(id);
    return buyer;
  }
}
