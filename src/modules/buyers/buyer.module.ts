import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { GetBuyerController } from '@modules/buyers/contexts/getBuyer/getBuyer.controller';

import { GetBuyerUseCase } from '@modules/buyers/contexts/getBuyer/getBuyer.useCase';

import { BuyerRepository } from '@modules/buyers/repository/buyer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BuyerRepository]),
    // CryptoProvider,
  ],
  providers: [
    // { provide: 'CRYPTO_PROVIDER', useClass: CryptoProvider },
    GetBuyerUseCase,
  ],
  controllers: [GetBuyerController],
})
export class BuyerModule {}
