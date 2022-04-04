import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BasketRepository } from '@modules/baskets/repository/basket.repository';

import { Basket } from '@shared/entities/basket/basket.entity';

@Injectable()
export class DeleteBasketUseCase {
  constructor(
    @InjectRepository(BasketRepository)
    private readonly basketRepository: BasketRepository,
  ) {}

  async execute(id: string): Promise<Basket> {
    const basket = await this.basketRepository.deleteBasketById(id);

    return basket;
  }
}
