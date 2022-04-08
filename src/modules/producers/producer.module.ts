import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { GetProducerController } from '@modules/producers/contexts/getProducer/getProducer.controller';
import { GetProducerBasketsController } from '@modules/producers/contexts/getProducerBaskets/getProducerBaskets.controller';
import { RemoveBasketFromProducerController } from '@modules/producers/contexts/removeBasketFromProducer/removeBasketFromProducer.controller';
import { SetProducerPixController } from '@modules/producers/contexts/setProducerPix/setProducerPix.controller';
import { GetProducerBalanceController } from '@modules/producers/contexts/getProducerBalance/getProducerBalance.controller';
import { GetProducerPixController } from '@modules/producers/contexts/getProducerPix/getProducerPix.controller';

import { GetProducerUseCase } from '@modules/producers/contexts/getProducer/getProducer.useCase';
import { GetProducerBasketsUseCase } from '@modules/producers/contexts/getProducerBaskets/getProducerBaskets.useCase';
import { RemoveBasketFromProducerUseCase } from '@modules/producers/contexts/removeBasketFromProducer/removeBasketFromProducer.useCase';
import { SetProducerPixUseCase } from '@modules/producers/contexts/setProducerPix/setProducerPix.useCase';
import { GetProducerBalanceUseCase } from '@modules/producers/contexts/getProducerBalance/getProducerBalance.useCase';
import { GetProducerPixUseCase } from '@modules/producers/contexts/getProducerPix/getProducerPix.useCase';

import { ProducerRepository } from '@modules/producers/repository/producer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProducerRepository]),
    // CryptoProvider,
  ],
  providers: [
    // { provide: 'CRYPTO_PROVIDER', useClass: CryptoProvider },
    GetProducerUseCase,
    GetProducerBasketsUseCase,
    RemoveBasketFromProducerUseCase,
    SetProducerPixUseCase,
    GetProducerBalanceUseCase,
    GetProducerPixUseCase,
  ],
  controllers: [
    GetProducerController,
    GetProducerBasketsController,
    RemoveBasketFromProducerController,
    SetProducerPixController,
    GetProducerBalanceController,
    GetProducerPixController,
  ],
})
export class ProducerModule {}
