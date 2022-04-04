import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidV4 } from 'uuid';

import { BasketRepository } from '@modules/baskets/repository/basket.repository';

import { CreateBasketRequestBodyDTO } from '@shared/dtos/basket/createBasketRequestBody.dto';

import { Basket } from '@shared/entities/basket/basket.entity';

@Injectable()
export class CreateBasketUseCase {
  constructor(
    @InjectRepository(BasketRepository)
    private readonly basketRepository: BasketRepository,
  ) {}

  async execute({
    size,
    daysPerDeliver,
    value,
  }: CreateBasketRequestBodyDTO): Promise<Basket> {
    const basket = await this.basketRepository.createBasket({
      id: uuidV4(),
      size,
      daysPerDeliver,
      value,
    });

    return basket;
  }
}
