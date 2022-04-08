import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { EditProducerDTO } from '@shared/dtos/producer/editProducer.dto';
import { CreateProducerDTO } from '@shared/dtos/producer/createProducer.dto';

import { BasketSize } from '@shared/entities/basket/basketSize.enum';
import { BasketRate } from '@shared/entities/basket/basketRate.enum';

import { Producer } from '@shared/entities/producer/producer.entity';
import { Basket } from '@shared/entities/basket/basket.entity';

import { unexpected } from '@shared/constants/errors';

import { ProducerPixDTO } from '@shared/dtos/producer/producerPix.dto';

@EntityRepository(Producer)
export class ProducerRepository extends Repository<Producer> {
  async getProducerPix(id: string): Promise<Producer> {
    try {
      const producer = await this.findOne({
        where: { userID: { id } },
      });
      return producer;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async addToBalance(producerID: string, value: number): Promise<Producer> {
    try {
      const response = await this.createQueryBuilder('producers')
        .update(Producer)
        .set({ balance: () => 'balance + :value' })
        .setParameter('value', value)
        .where('userID = :producerID', { producerID })
        .returning('*')
        .updateEntity(true)
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async setProducerPix({
    userID,
    pixType,
    pixValue = null,
  }: ProducerPixDTO): Promise<Producer> {
    try {
      const response = await this.createQueryBuilder('producers')
        .update<Producer>(Producer, { [pixType + 'Pix']: pixValue })
        .where('userID = :userID', { userID })
        .returning('*')
        .updateEntity(true)
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getProducersBaskets(
    size: BasketSize,
    daysPerDeliver: BasketRate,
  ): Promise<Producer[]> {
    try {
      const producersBaskets = await this.createQueryBuilder('producers')
        .leftJoin('producers.userID', 'user')
        .leftJoin(`producers.${size}Basket`, 'basket')
        .where(
          daysPerDeliver ? 'basket.daysPerDeliver = :daysPerDeliver' : '',
          { daysPerDeliver },
        )
        .andWhere('basket.id is not null')
        .select(['user.id', 'basket'])
        .getRawMany();
      return producersBaskets;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getProducerBaskets(id: string): Promise<Producer> {
    try {
      const producer = await this.findOne({
        relations: ['bigBasket', 'mediumBasket', 'smallBasket'],
        where: { userID: { id } },
      });
      return producer;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getProducerBalance(id: string): Promise<Producer> {
    try {
      const producer = await this.findOne({
        where: { userID: { id } },
        select: ['balance'],
      });
      return producer;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async removeBasketFromProducer(
    userID: string,
    basketSize: BasketSize,
  ): Promise<Producer> {
    try {
      const response = await this.createQueryBuilder('producers')
        .update<Producer>(Producer, { [basketSize + 'Basket']: null })
        .where('userID = :userID', { userID })
        .returning('*')
        .updateEntity(true)
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async assignBasketToProducer(
    userID: string,
    basket: Basket,
    basketSize: BasketSize,
  ): Promise<Producer> {
    try {
      const response = await this.createQueryBuilder('producers')
        .update<Producer>(Producer, { [basketSize + 'Basket']: basket })
        .where('userID = :userID', { userID })
        .returning('*')
        .updateEntity(true)
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async createProducer(
    createProducerDTO: CreateProducerDTO,
  ): Promise<Producer> {
    try {
      const producerBody = this.create(createProducerDTO);
      const producer = await this.save(producerBody);
      return producer;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getProducerById(id: string): Promise<Producer> {
    try {
      const producer = await this.findOne({
        relations: ['userID'],
        where: { userID: { id } },
      });
      return producer;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async editProducerById(
    userID: string,
    editProducerDTO: EditProducerDTO,
  ): Promise<Producer> {
    try {
      const updatedData = await this.createQueryBuilder('producers')
        .update<Producer>(Producer, { ...editProducerDTO })
        .where('id = :userID', { userID })
        .returning('phone')
        .updateEntity(true)
        .execute();
      return updatedData.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
