import { Param, Controller, HttpCode, HttpStatus, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { BasketFood } from '@shared/entities/basketFood/basketFood.entity';
import { Basket } from '@shared/entities/basket/basket.entity';

import { instanceToInstance } from 'class-transformer';

import { GetBasketFoodsUseCase } from '@modules/baskets/contexts/getBasketFoods/getBasketFoods.useCase';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Baskets')
@Controller('baskets')
export class GetBasketFoodsController {
  constructor(private readonly getBasketFoodsUseCase: GetBasketFoodsUseCase) {}

  @Get('basket/:id')
  @Roles(UserType.producer, UserType.consumer)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: [BasketFood],
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async listBasketFoods(@Param('id') id: string) {
    const basket = new Basket();
    basket.id = id;
    const food = await this.getBasketFoodsUseCase.listBasketsFoods(basket);
    return instanceToInstance(food);
  }
}
