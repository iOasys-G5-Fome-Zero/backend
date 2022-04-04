import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AddFoodToBasketRequestBodyDTO } from '@shared/dtos/basketFood/addFoodToBasketRequestBody.dto';

import { BasketFood } from '@shared/entities/basketFood/basketFood.entity';

import { instanceToInstance } from 'class-transformer';

import { AddFoodToBasketUseCase } from '@modules/foods/contexts/addFoodToBasket/addFoodToBasket.useCase';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Foods')
@Controller('foods/add-food-to-basket')
export class AddFoodToBasketController {
  constructor(
    private readonly addFoodToBasketUseCase: AddFoodToBasketUseCase,
  ) {}

  @Post()
  @Roles(UserType.producer)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: BasketFood,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(
    @Body() addFoodToBasketRequestBodyDTO: AddFoodToBasketRequestBodyDTO,
  ) {
    const basketFood = await this.addFoodToBasketUseCase.execute(
      addFoodToBasketRequestBodyDTO,
    );
    return instanceToInstance(basketFood);
  }
}
