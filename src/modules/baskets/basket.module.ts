import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateBasketController } from '@modules/baskets/contexts/createBasket/createBasket.controller';
import { DeleteBasketController } from '@modules/baskets/contexts/deleteBasket/deleteBasket.controller';
import { GetBasketsController } from '@modules/baskets/contexts/getBaskets/getBaskets.controller';
import { GetBasketFoodsController } from '@modules/baskets/contexts/getBasketFoods/getBasketFoods.controller';

import { CreateBasketUseCase } from '@modules/baskets/contexts/createBasket/createBasket.useCase';
import { DeleteBasketUseCase } from '@modules/baskets/contexts/deleteBasket/deleteBasket.useCase';
import { GetBasketsUseCase } from '@modules/baskets/contexts/getBaskets/getBaskets.useCase';
import { GetBasketFoodsUseCase } from '@modules/baskets/contexts/getBasketFoods/getBasketFoods.useCase';
import { AssignBasketToProducerControler } from '@modules/baskets/contexts/assignBasketToProducer/assignBasketToProducer.controller';
import { assignBasketToConsumerControler } from '@modules/baskets/contexts/assignBasketToConsumer/assignBasketToConsumer.controller';
import { GetProducersBasketsController } from '@modules/baskets/contexts/getProducersBaskets/getProducersBaskets.controller';

import { BasketRepository } from '@modules/baskets/repository/basket.repository';
import { BasketFoodRepository } from '@modules/foods/repository/basketFoods.repository';
import { ProducerRepository } from '@modules/producers/repository/producer.repository';
import { ConsumerRepository } from '@modules/consumers/repository/consumer.repository';
import { AssignBasketToProducerUseCase } from '@modules/baskets/contexts/assignBasketToProducer/assignBasketToProducer.useCase';
import { AssignBasketToConsumerUseCase } from '@modules/baskets/contexts/assignBasketToConsumer/assignBasketToConsumer.userCase';
import { GetProducersBasketsUseCase } from '@modules/baskets/contexts/getProducersBaskets/getProducersBaskets.useCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BasketRepository,
      BasketFoodRepository,
      ProducerRepository,
      ConsumerRepository,
    ]),
  ],
  providers: [
    CreateBasketUseCase,
    DeleteBasketUseCase,
    GetBasketsUseCase,
    GetBasketFoodsUseCase,
    AssignBasketToProducerUseCase,
    AssignBasketToConsumerUseCase,
    GetProducersBasketsUseCase,
  ],
  controllers: [
    CreateBasketController,
    DeleteBasketController,
    GetBasketsController,
    GetBasketFoodsController,
    AssignBasketToProducerControler,
    assignBasketToConsumerControler,
    GetProducersBasketsController,
  ],
})
export class BasketModule {}
