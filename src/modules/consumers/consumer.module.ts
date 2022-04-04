import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { GetConsumerController } from '@modules/consumers/contexts/getConsumer/getConsumer.controller';
import { GetConsumerBasketController } from '@modules/consumers/contexts/getConsumerBasket/getProducerBasket.controller';
import { RemoveBasketFromConsumerController } from '@modules/consumers/contexts/removeBasketFromConsumer/removeBasketFromConsumer.controller';
import { SetRemovedFoodController } from '@modules/consumers/contexts/setRemovedFood/setRemovedFood.controller';
import { DeleteRemovedFoodsController } from '@modules/consumers/contexts/deleteRemovedFoods/deleteRemovedFoods.controller';
import { GetRemovedFoodsController } from '@modules/consumers/contexts/getRemovedFoods/GetRemovedFoods.controller';
import { AddCoinsController } from '@modules/consumers/contexts/addCoins/addCoins.controller';
import { SubtractCoinsController } from '@modules/consumers/contexts/subtractCoins/subtractCoins.controller';

import { GetConsumerUseCase } from '@modules/consumers/contexts/getConsumer/getConsumer.useCase';
import { GetConsumerBasketUseCase } from '@modules/consumers/contexts/getConsumerBasket/getConsumerBasket.useCase';
import { RemoveBasketFromConsumerUseCase } from '@modules/consumers/contexts/removeBasketFromConsumer/removeBasketFromConsumer.useCase';
import { SetRemovedFoodUseCase } from '@modules/consumers/contexts/setRemovedFood/setRemovedFood.useCase';
import { DeleteRemovedFoodsUseCase } from '@modules/consumers/contexts/deleteRemovedFoods/deleteRemovedFoods.useCase';
import { GetRemovedFoodsUseCase } from '@modules/consumers/contexts/getRemovedFoods/GetRemovedFoods.useCase';
import { AddCoinsUseCase } from '@modules/consumers/contexts/addCoins/addCoins.useCase';
import { SubtractCoinsUseCase } from '@modules/consumers/contexts/subtractCoins/subtractCoins.useCase';

import { ConsumerRepository } from '@modules/consumers/repository/consumer.repository';
import { RemovedFoodsRepository } from '@modules/consumers/repository/removedFoods.repository';
import { BasketFoodRepository } from '@modules/foods/repository/basketFoods.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConsumerRepository,
      RemovedFoodsRepository,
      BasketFoodRepository,
    ]),
    // CryptoProvider,
  ],
  providers: [
    // { provide: 'CRYPTO_PROVIDER', useClass: CryptoProvider },
    GetConsumerUseCase,
    GetConsumerBasketUseCase,
    RemoveBasketFromConsumerUseCase,
    SetRemovedFoodUseCase,
    DeleteRemovedFoodsUseCase,
    GetRemovedFoodsUseCase,
    AddCoinsUseCase,
    SubtractCoinsUseCase,
  ],
  controllers: [
    GetConsumerController,
    GetConsumerBasketController,
    RemoveBasketFromConsumerController,
    SetRemovedFoodController,
    DeleteRemovedFoodsController,
    GetRemovedFoodsController,
    AddCoinsController,
    SubtractCoinsController,
  ],
})
export class ConsumerModule {}
