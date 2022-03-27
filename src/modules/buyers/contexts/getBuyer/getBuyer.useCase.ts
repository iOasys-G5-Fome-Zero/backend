import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { alreadyExists } from '@shared/constants/errors';

import { BuyerRepository } from '@modules/buyers/repository/buyer.repository';
import { Buyer } from '@shared/entities/buyer/buyer.entity';

@Injectable()
export class GetBuyerUseCase {
  constructor(
    @InjectRepository(BuyerRepository)
    private readonly buyerRepository: BuyerRepository,
    @Inject('ENCRYPT_PROVIDER')
    private readonly encryption: BcryptProvider,
    @Inject('CRYPTO_PROVIDER')
    private readonly crypto: CryptoProvider,
  ) {}

  async getBuyerById(id: string): Promise<Buyer> {
    const buyer = this.buyerRepository.getBuyerById(id);
    return buyer;
  }
}
