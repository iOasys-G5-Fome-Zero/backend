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

import { AssignBasketRequestToConsumerBodyDTO } from '@shared/dtos/basket/assignBasketRequestBodyToConsumer.dto';

import { Consumer } from '@shared/entities/consumer/consumer.entity';

import { instanceToInstance } from 'class-transformer';

import { AssignBasketToConsumerUseCase } from '@modules/baskets/contexts/assignBasketToConsumer/assignBasketToConsumer.userCase';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Baskets')
@Controller('baskets/assign-basket-to-consumer')
export class assignBasketToConsumerControler {
  constructor(
    private readonly assignBasketToConsumerUseCase: AssignBasketToConsumerUseCase,
  ) {}

  @Patch()
  @Roles(UserType.consumer)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Consumer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async create(
    @Body() basket: AssignBasketRequestToConsumerBodyDTO,
    @Request() req,
  ) {
    const consumer = await this.assignBasketToConsumerUseCase.execute(
      req.user.id,
      basket.basketID,
      basket.producerID,
    );
    return instanceToInstance(consumer);
  }
}
