import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateBasketRequestBodyDTO } from '@shared/dtos/basket/createBasketRequestBody.dto';

import { Basket } from '@shared/entities/basket/basket.entity';

import { instanceToInstance } from 'class-transformer';

import { CreateBasketUseCase } from '@modules/baskets/contexts/createBasket/createBasket.useCase';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Baskets')
@Controller('baskets/new-basket')
export class CreateBasketController {
  constructor(private readonly createBasketUseCase: CreateBasketUseCase) {}

  @Post()
  @Roles(UserType.producer)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Basket,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async create(
    @Body() createBasketRequestBodyDTO: CreateBasketRequestBodyDTO,
  ) {
    const basket = await this.createBasketUseCase.execute(
      createBasketRequestBodyDTO,
    );
    return instanceToInstance(basket);
  }
}
