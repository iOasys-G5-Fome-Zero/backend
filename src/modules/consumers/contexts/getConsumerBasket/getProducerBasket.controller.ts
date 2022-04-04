import { Controller, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetConsumerBasketUseCase } from '@modules/consumers/contexts/getConsumerBasket/getConsumerBasket.useCase';
import { Consumer } from '@shared/entities/consumer/consumer.entity';
import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Consumers')
@Controller('consumers/get-consumer-basket')
export class GetConsumerBasketController {
  constructor(
    private readonly getConsumerBasketUseCase: GetConsumerBasketUseCase,
  ) {}
  @Roles(UserType.consumer)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Consumer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(@Request() req) {
    const consumer = await this.getConsumerBasketUseCase.execute(req.user.id);
    return instanceToInstance(consumer);
  }
}
