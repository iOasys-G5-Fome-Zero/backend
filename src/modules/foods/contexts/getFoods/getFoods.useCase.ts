import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FoodRepository } from '@modules/foods/repository/food.repository';

import { Food } from '@shared/entities/food/food.entity';

@Injectable()
export class GetFoodsUseCase {
  constructor(
    @InjectRepository(FoodRepository)
    private readonly foodRepository: FoodRepository,
  ) {}

  async execute(name: string): Promise<Food[]> {
    const foods = await this.foodRepository.getFoods(name);

    return foods;
  }
}
