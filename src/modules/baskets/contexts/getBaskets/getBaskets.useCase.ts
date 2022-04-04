import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BasketRepository } from '@modules/baskets/repository/basket.repository';

import { Basket } from '@shared/entities/basket/basket.entity';

import { BasketSize } from '@shared/entities/basket/basketSize.enum';
import { BasketRate } from '@shared/entities/basket/basketRate.enum';

@Injectable()
export class GetBasketsUseCase {
  constructor(
    @InjectRepository(BasketRepository)
    private readonly basketRepository: BasketRepository,
  ) {}

  async execute(
    size: BasketSize,
    daysPerDeliver: BasketRate,
    value: string,
  ): Promise<Basket[]> {
    const baskets = await this.basketRepository.getBaskets(
      size,
      daysPerDeliver,
      +value,
    );

    return baskets;
  }
}
