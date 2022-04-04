import {
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
} from '@nestjs/swagger';

import { RemoveBasketFromConsumerUseCase } from '@modules/consumers/contexts/removeBasketFromConsumer/removeBasketFromConsumer.useCase';

import { Consumer } from '@shared/entities/consumer/consumer.entity';

import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Consumers')
@Controller('consumers/basket')
export class RemoveBasketFromConsumerController {
  constructor(
    private readonly removeBasketFromConsumerUseCase: RemoveBasketFromConsumerUseCase,
  ) {}

  @Delete('delete')
  @Roles(UserType.consumer)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Consumer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async create(@Request() req) {
    const consumer = await this.removeBasketFromConsumerUseCase.execute(
      req.user.id,
    );
    return instanceToInstance(consumer);
  }
}
