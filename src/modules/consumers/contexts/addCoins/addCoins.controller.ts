import { Controller, HttpCode, HttpStatus, Patch, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AddCoinsUseCase } from '@modules/consumers/contexts/addCoins/addCoins.useCase';

import { Consumer } from '@shared/entities/consumer/consumer.entity';

import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Consumers')
@Controller('consumers/add-coins')
export class AddCoinsController {
  constructor(private readonly addCoinsUseCase: AddCoinsUseCase) {}

  @Patch(':consumerID')
  @Roles(UserType.producer)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Consumer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(@Param('consumerID') consumerID: string) {
    const consumer = await this.addCoinsUseCase.execute(consumerID);
    return instanceToInstance(consumer);
  }
}
