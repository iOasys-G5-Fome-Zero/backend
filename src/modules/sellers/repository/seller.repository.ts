import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { EditSellerDTO } from '@shared/dtos/seller/editSeller.dto';
import { CreateSellerDTO } from '@shared/dtos/seller/createSeller.dto';

import { Seller } from '@shared/entities/seller/seller.entity';
import { unexpected } from '@shared/constants/errors';

@EntityRepository(Seller)
export class SellerRepository extends Repository<Seller> {
  async createSeller(createSellerDTO: CreateSellerDTO): Promise<Seller> {
    try {
      const sellerBody = this.create(createSellerDTO);
      const seller = await this.save(sellerBody);
      return seller;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getSellerById(id: string): Promise<Seller> {
    try {
      const seller = await this.findOne({
        relations: ['userID'],
        where: { userID: { id } },
      });
      return seller;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async editSellerById(
    userID: string,
    editSellerDTO: EditSellerDTO,
  ): Promise<Seller> {
    try {
      const updatedData = await this.createQueryBuilder('sellers')
        .update<Seller>(Seller, { ...editSellerDTO })
        .where('id = :userID', { userID })
        .returning('phone')
        .updateEntity(true)
        .execute();
      return updatedData.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
    ('a');
  }
}
