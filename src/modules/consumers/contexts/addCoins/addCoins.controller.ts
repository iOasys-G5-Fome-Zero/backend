import {
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

import { AddCoinsUseCase } from '@modules/consumers/contexts/addCoins/addCoins.useCase';

import { Consumer } from '@shared/entities/consumer/consumer.entity';

import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Consumers')
@Controller('consumers/add-coins')
export class AddCoinsController {
  constructor(private readonly addCoinsUseCase: AddCoinsUseCase) {}

  @Patch()
  @Roles(UserType.consumer)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Consumer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(@Request() req) {
    const consumer = await this.addCoinsUseCase.execute(req.user.id);
    return instanceToInstance(consumer);
  }
}
