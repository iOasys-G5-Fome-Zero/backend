import {
  Param,
  Controller,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Basket } from '@shared/entities/basket/basket.entity';

import { instanceToInstance } from 'class-transformer';

import { DeleteBasketUseCase } from '@modules/baskets/contexts/deleteBasket/deleteBasket.useCase';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Baskets')
@Controller('baskets/delete/:id')
export class DeleteBasketController {
  constructor(private readonly celeteBasketUseCase: DeleteBasketUseCase) {}

  @Delete()
  @Roles(UserType.producer)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Basket,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async delete(@Param('id') id: string) {
    const basket = await this.celeteBasketUseCase.execute(id);
    return instanceToInstance(basket);
  }
}
