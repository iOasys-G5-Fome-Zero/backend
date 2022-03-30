import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { SellerRepository } from '@modules/sellers/repository/seller.repository';
import { Seller } from '@shared/entities/seller/seller.entity';

@Injectable()
export class GetSellerUseCase {
  constructor(
    // @Inject('CRYPTO_PROVIDER')
    // private readonly crypto: CryptoProvider,
    @InjectRepository(SellerRepository)
    private readonly sellerRepository: SellerRepository,
  ) {}

  async getSellerById(id: string): Promise<Seller> {
    const seller = this.sellerRepository.getSellerById(id);
    return seller;
  }
}
