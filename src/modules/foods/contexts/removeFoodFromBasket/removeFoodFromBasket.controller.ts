import { Body, Controller, HttpCode, HttpStatus, Delete } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RemoveFoodFromBasketRequestBodyDTO } from '@shared/dtos/basketFood/removeFoodFromBasketRequestBody.dto';

import { BasketFood } from '@shared/entities/basketFood/basketFood.entity';

import { instanceToInstance } from 'class-transformer';

import { RemoveFoodFromBasketUseCase } from '@modules/foods/contexts/removeFoodFromBasket/removeFoodFromBasket.useCase';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Foods')
@Controller('foods/remove-food-from-basket')
export class RemoveFoodFromBasketController {
  constructor(
    private readonly removeFoodFromBasketUseCase: RemoveFoodFromBasketUseCase,
  ) {}

  @Delete()
  @Roles(UserType.producer)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: BasketFood,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async remove(
    @Body()
    { basketID, foodName }: RemoveFoodFromBasketRequestBodyDTO,
  ) {
    const basketFood = await this.removeFoodFromBasketUseCase.execute(
      basketID,
      foodName,
    );
    return instanceToInstance(basketFood);
  }
}
