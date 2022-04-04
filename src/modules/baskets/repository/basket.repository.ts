import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { Basket } from '@shared/entities/basket/basket.entity';

import { CreateBasketDTO } from '@shared/dtos/basket/createBasket.dto';

import { unexpected } from '@shared/constants/errors';

import { BasketSize } from '@shared/entities/basket/basketSize.enum';
import { BasketRate } from '@shared/entities/basket/basketRate.enum';

@EntityRepository(Basket)
export class BasketRepository extends Repository<Basket> {
  async getBaskets(
    size: BasketSize,
    daysPerDeliver: BasketRate,
    value: number,
  ): Promise<Basket[]> {
    try {
      const filters: {
        size?: BasketSize;
        value?: number;
        daysPerDeliver?: BasketRate;
      } = {};

      size && (filters.size = size);
      value && (filters.value = value);
      daysPerDeliver && (filters.daysPerDeliver = daysPerDeliver);

      return await this.find({
        where: filters,
      });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async findBasketById(id: string): Promise<Basket | undefined> {
    try {
      return await this.findOne({ id });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async createBasket(createBasketDTO: CreateBasketDTO): Promise<Basket> {
    try {
      const basket = this.create(createBasketDTO);
      return await this.save(basket);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async deleteBasketById(id: string): Promise<Basket | undefined> {
    try {
      const response = await this.createQueryBuilder()
        .softDelete()
        .from(Basket)
        .where('id = :id', { id })
        .returning('id, size, value')
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
