import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { alreadyExists } from '@shared/constants/errors';

import { SellerRepository } from '@modules/sellers/repository/seller.repository';
import { Seller } from '@shared/entities/seller/seller.entity';

@Injectable()
export class GetSellerUseCase {
  constructor(
    @InjectRepository(SellerRepository)
    private readonly sellerRepository: SellerRepository,
    @Inject('ENCRYPT_PROVIDER')
    private readonly encryption: BcryptProvider,
    @Inject('CRYPTO_PROVIDER')
    private readonly crypto: CryptoProvider,
  ) {}

  async getSellerById(id: string): Promise<Seller> {
    const seller = this.sellerRepository.getSellerById(id);
    return seller;
  }
}
