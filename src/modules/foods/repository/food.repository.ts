import { EntityRepository, Repository, Like } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { Food } from '@shared/entities/food/food.entity';

import { CreateFoodDTO } from '@shared/dtos/food/createFood.dto';

import { unexpected } from '@shared/constants/errors';

@EntityRepository(Food)
export class FoodRepository extends Repository<Food> {
  async getFoods(name: string): Promise<Food[]> {
    try {
      return await this.find(name ? { name: Like(`%${name}%`) } : {});
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async findFoodById(id: string): Promise<Food | undefined> {
    try {
      return await this.findOne({ id });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async findFoodByName(
    name: string,
    withDeleted = false,
  ): Promise<Food | undefined> {
    try {
      return await this.findOne({ name }, { withDeleted });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async createFood(createFoodDTO: CreateFoodDTO): Promise<Food> {
    try {
      const food = this.create(createFoodDTO);
      return await this.save(food);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async deleteFoodById(id: string): Promise<Food | undefined> {
    try {
      const response = await this.createQueryBuilder()
        .softDelete()
        .from(Food)
        .where('id = :id', { id })
        .returning('id, name, image_url, price_weight')
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async deleteFoodByName(name: string): Promise<Food | undefined> {
    try {
      const response = await this.createQueryBuilder()
        .softDelete()
        .from(Food)
        .where('name = :name', { name })
        .returning('id, name, image_url,price_weight')
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
