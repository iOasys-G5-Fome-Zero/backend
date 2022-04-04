import { Query, Controller, HttpCode, HttpStatus, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';

import { Producer } from '@shared/entities/producer/producer.entity';

import { instanceToInstance } from 'class-transformer';

import { GetProducersBasketsUseCase } from '@modules/baskets/contexts/getProducersBaskets/getProducersBaskets.useCase';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

import { BasketSize } from '@shared/entities/basket/basketSize.enum';
import { BasketRate } from '@shared/entities/basket/basketRate.enum';

@ApiTags('Baskets')
@Controller('baskets/producers-baskets')
export class GetProducersBasketsController {
  constructor(
    private readonly getProducersBasketsUseCase: GetProducersBasketsUseCase,
  ) {}

  @Get()
  @Roles(UserType.consumer)
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'size', enum: BasketSize, required: true })
  @ApiQuery({ name: 'daysPerDeliver', enum: BasketRate, required: false })
  @ApiCreatedResponse({
    type: [Producer],
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async getBaskets(
    @Query()
    query: {
      size: BasketSize;
      daysPerDeliver: BasketRate;
    },
  ) {
    const producersBaskets = await this.getProducersBasketsUseCase.execute(
      query.size,
      query.daysPerDeliver,
    );
    return instanceToInstance(producersBaskets);
  }
}
