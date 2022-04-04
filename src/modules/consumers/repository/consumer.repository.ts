import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { EditConsumerDTO } from '@shared/dtos/consumer/editConsumer.dto';
import { CreateConsumerDTO } from '@shared/dtos/consumer/createConsumer.dto';

import { Consumer } from '@shared/entities/consumer/consumer.entity';
import { Basket } from '@shared/entities/basket/basket.entity';
import { Producer } from '@shared/entities/producer/producer.entity';

import { unexpected } from '@shared/constants/errors';

@EntityRepository(Consumer)
export class ConsumerRepository extends Repository<Consumer> {
  async handleCoins(userID: string, coins: number): Promise<Consumer> {
    try {
      const response = await this.createQueryBuilder('consumers')
        .update(Consumer)
        .set({ cryptoCoins: () => 'crypto_coins + :coins' })
        .setParameter('coins', coins)
        .where('userID = :userID', { userID })
        .returning('*')
        .updateEntity(true)
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getConsumerBaskets(id: string): Promise<Consumer> {
    try {
      const consumer = await this.findOne({
        relations: ['basketID'],
        where: { userID: { id } },
      });
      return consumer;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async removeBasketFromConsumer(userID: string): Promise<Consumer> {
    try {
      const response = await this.createQueryBuilder('consumers')
        .update<Consumer>(Consumer, { basketID: null, basketProducerID: null })
        .where('userID = :userID', { userID })
        .returning('*')
        .updateEntity(true)
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async assignBasketToConsumer(
    userID: string,
    basket: Basket,
    producer: Producer,
  ): Promise<Consumer> {
    try {
      const response = await this.createQueryBuilder('consumers')
        .update<Consumer>(Consumer, {
          basketID: basket,
          basketProducerID: producer,
        })
        .where('userID = :userID', { userID })
        .returning('*')
        .updateEntity(true)
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async createConsumer(
    createConsumerDTO: CreateConsumerDTO,
  ): Promise<Consumer> {
    try {
      const consumerBody = this.create(createConsumerDTO);
      const consumer = await this.save(consumerBody);
      return consumer;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getConsumerById(id: string): Promise<Consumer> {
    try {
      const consumer = await this.findOne({
        relations: ['userID'],
        where: { userID: { id } },
      });
      return consumer;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async editConsumerById(
    userID: string,
    editConsumerDTO: EditConsumerDTO,
  ): Promise<Consumer> {
    try {
      const updatedData = await this.createQueryBuilder('consumers')
        .update<Consumer>(Consumer, { ...editConsumerDTO })
        .where('id = :userID', { userID })
        .returning('email')
        .updateEntity(true)
        .execute();
      return updatedData.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
