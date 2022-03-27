import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { EditBuyerDTO } from '@shared/dtos/buyer/editBuyer.dto';
import { CreateBuyerDTO } from '@shared/dtos/buyer/createBuyer.dto';

import { Buyer } from '@shared/entities/buyer/buyer.entity';

import { unexpected } from '@shared/constants/errors';

@EntityRepository(Buyer)
export class BuyerRepository extends Repository<Buyer> {
  async createBuyer(createBuyerDTO: CreateBuyerDTO): Promise<Buyer> {
    try {
      const buyerBody = this.create(createBuyerDTO);
      const buyer = await this.save(buyerBody);
      return buyer;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getBuyerById(id: string): Promise<Buyer> {
    try {
      const buyer = await this.findOne({
        relations: ['userID'],
        where: { userID: { id } },
      });
      return buyer;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async editBuyerById(
    userID: string,
    editBuyerDTO: EditBuyerDTO,
  ): Promise<Buyer> {
    try {
      const updatedData = await this.createQueryBuilder('buyers')
        .update<Buyer>(Buyer, { ...editBuyerDTO })
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
