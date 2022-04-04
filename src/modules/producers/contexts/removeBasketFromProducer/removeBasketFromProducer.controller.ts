import {
  Param,
  Controller,
  HttpCode,
  HttpStatus,
  Delete,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';

import { Producer } from '@shared/entities/producer/producer.entity';

import { instanceToInstance } from 'class-transformer';

import { RemoveBasketFromProducerUseCase } from '@modules/producers/contexts/removeBasketFromProducer/removeBasketFromProducer.useCase';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';
import { BasketSize } from '@shared/entities/basket/basketSize.enum';

@ApiTags('Producers')
@Controller('producers/baskets')
export class RemoveBasketFromProducerController {
  constructor(
    private readonly removeBasketFromProducerUseCase: RemoveBasketFromProducerUseCase,
  ) {}

  @Delete('delete/:size')
  @Roles(UserType.producer)
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'size', enum: BasketSize, required: true })
  @ApiCreatedResponse({
    type: Producer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async create(@Param('size') size: BasketSize, @Request() req) {
    const producer = await this.removeBasketFromProducerUseCase.execute(
      req.user.id,
      size,
    );
    return instanceToInstance(producer);
  }
}
