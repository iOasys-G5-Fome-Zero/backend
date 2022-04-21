import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { GetProducerController } from '@modules/producers/contexts/getProducer/getProducer.controller';
import { GetProducerBasketsController } from '@modules/producers/contexts/getProducerBaskets/getProducerBaskets.controller';
import { RemoveBasketFromProducerController } from '@modules/producers/contexts/removeBasketFromProducer/removeBasketFromProducer.controller';
import { SetProducerPixController } from '@modules/producers/contexts/setProducerPix/setProducerPix.controller';
import { GetProducerBalanceController } from '@modules/producers/contexts/getProducerBalance/getProducerBalance.controller';
import { GetProducerPixController } from '@modules/producers/contexts/getProducerPix/getProducerPix.controller';
import { GetProducerSignedBasketsController } from '@modules/producers/contexts/getProducerSignedBaskets/getProducerSignedBaskets.controller';

import { GetProducerUseCase } from '@modules/producers/contexts/getProducer/getProducer.useCase';
import { GetProducerBasketsUseCase } from '@modules/producers/contexts/getProducerBaskets/getProducerBaskets.useCase';
import { RemoveBasketFromProducerUseCase } from '@modules/producers/contexts/removeBasketFromProducer/removeBasketFromProducer.useCase';
import { SetProducerPixUseCase } from '@modules/producers/contexts/setProducerPix/setProducerPix.useCase';
import { GetProducerBalanceUseCase } from '@modules/producers/contexts/getProducerBalance/getProducerBalance.useCase';
import { GetProducerPixUseCase } from '@modules/producers/contexts/getProducerPix/getProducerPix.useCase';
import { GetProducerSignedBasketsUseCase } from '@modules/producers/contexts/getProducerSignedBaskets/getProducerSignedBaskets.useCase';

import { ProducerRepository } from '@modules/producers/repository/producer.repository';
import { ConsumerRepository } from '@modules/consumers/repository/consumer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProducerRepository, ConsumerRepository]),
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
    GetProducerSignedBasketsUseCase,
  ],
  controllers: [
    GetProducerController,
    GetProducerBasketsController,
    RemoveBasketFromProducerController,
    SetProducerPixController,
    GetProducerBalanceController,
    GetProducerPixController,
    GetProducerSignedBasketsController,
  ],
})
export class ProducerModule {}
