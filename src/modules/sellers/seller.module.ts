import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { GetSellerController } from '@modules/sellers/contexts/getSeller/getSeller.controller';

import { GetSellerUseCase } from '@modules/sellers/contexts/getSeller/getSeller.useCase';

import { SellerRepository } from '@modules/sellers/repository/seller.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SellerRepository]),
    BcryptProvider,
    CryptoProvider,
  ],
  providers: [
    { provide: 'ENCRYPT_PROVIDER', useClass: BcryptProvider },
    { provide: 'CRYPTO_PROVIDER', useClass: CryptoProvider },
    GetSellerUseCase,
  ],
  controllers: [GetSellerController],
})
export class SellerModule {}
