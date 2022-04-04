import { Query, Controller, HttpCode, HttpStatus, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';

import { Basket } from '@shared/entities/basket/basket.entity';

import { instanceToInstance } from 'class-transformer';

import { GetBasketsUseCase } from '@modules/baskets/contexts/getBaskets/getBaskets.useCase';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

import { BasketSize } from '@shared/entities/basket/basketSize.enum';
import { BasketRate } from '@shared/entities/basket/basketRate.enum';

@ApiTags('Baskets')
@Controller('baskets/list')
export class GetBasketsController {
  constructor(private readonly getBasketsUseCase: GetBasketsUseCase) {}

  @Get()
  @Roles(UserType.producer)
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'size', enum: BasketSize, required: false })
  @ApiQuery({ name: 'daysPerDeliver', enum: BasketRate, required: false })
  @ApiQuery({ name: 'value', required: false })
  @ApiCreatedResponse({
    type: [Basket],
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async getBaskets(
    @Query()
    query: {
      size: BasketSize;
      daysPerDeliver: BasketRate;
      value: string;
    },
  ) {
    const basket = await this.getBasketsUseCase.execute(
      query.size,
      query.daysPerDeliver,
      query.value,
    );
    return instanceToInstance(basket);
  }
}
