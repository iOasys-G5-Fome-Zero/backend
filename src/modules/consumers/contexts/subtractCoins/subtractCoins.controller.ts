import {
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Request,
  Body,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { SubtractCoinsUseCase } from '@modules/consumers/contexts/subtractCoins/subtractCoins.useCase';

import { Consumer } from '@shared/entities/consumer/consumer.entity';

import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

import { CoinsRequestBodyDTO } from '@shared/dtos/consumer/coinsRequestBody.dto';

@ApiTags('Consumers')
@Controller('consumers/subtract-coins')
export class SubtractCoinsController {
  constructor(private readonly subtractCoinsUseCase: SubtractCoinsUseCase) {}

  @Patch()
  @Roles(UserType.consumer)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Consumer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(@Body() { coins }: CoinsRequestBodyDTO, @Request() req) {
    const consumer = await this.subtractCoinsUseCase.execute(
      req.user.id,
      coins,
    );
    return instanceToInstance(consumer);
  }
}
