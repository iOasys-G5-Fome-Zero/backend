import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidV4 } from 'uuid';

import { FoodRepository } from '@modules/foods/repository/food.repository';

import { CreateFoodRequestBodyDTO } from '@shared/dtos/food/createFoodRequestBody.dto';

import { Food } from '@shared/entities/food/food.entity';
import { alreadyExists } from '@shared/constants/errors';

@Injectable()
export class CreateFoodUseCase {
  constructor(
    @InjectRepository(FoodRepository)
    private readonly foodRepository: FoodRepository,
  ) {}

  async execute({
    name,
    priceWeight,
  }: CreateFoodRequestBodyDTO): Promise<Food> {
    const registeredFood = await this.foodRepository.findFoodByName(name, true);

    if (registeredFood) throw new ConflictException(alreadyExists('food'));

    const food = await this.foodRepository.createFood({
      id: uuidV4(),
      name,
      priceWeight,
    });

    return food;
  }
}
