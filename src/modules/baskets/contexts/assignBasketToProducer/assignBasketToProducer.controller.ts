import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AssignBasketToProducerRequestBodyDTO } from '@shared/dtos/basket/assignBasketToProducerRequestBody.dto';

import { Producer } from '@shared/entities/producer/producer.entity';

import { instanceToInstance } from 'class-transformer';

import { AssignBasketToProducerUseCase } from '@modules/baskets/contexts/assignBasketToProducer/assignBasketToProducer.useCase';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Baskets')
@Controller('baskets/assign-basket-to-producer')
export class AssignBasketToProducerControler {
  constructor(
    private readonly assignBasketToProducerUseCase: AssignBasketToProducerUseCase,
  ) {}

  @Patch()
  @Roles(UserType.producer)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Producer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async create(
    @Body() basket: AssignBasketToProducerRequestBodyDTO,
    @Request() req,
  ) {
    const producer = await this.assignBasketToProducerUseCase.execute(
      req.user.id,
      basket.basketID,
    );
    return instanceToInstance(producer);
  }
}
