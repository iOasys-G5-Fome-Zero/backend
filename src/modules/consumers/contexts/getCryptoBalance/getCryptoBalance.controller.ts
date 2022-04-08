import { Request, Controller, HttpCode, HttpStatus, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetCryptoBalanceUseCase } from '@modules/consumers/contexts/getCryptoBalance/getCryptoBalance.useCase';
import { Consumer } from '@shared/entities/consumer/consumer.entity';
import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Consumers')
@Controller('consumers/get-cryptos')
export class GetCryptoBalanceController {
  constructor(
    private readonly getCryptoBalanceUseCase: GetCryptoBalanceUseCase,
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
    const consumer = await this.getCryptoBalanceUseCase.execute(req.user.id);
    return instanceToInstance(consumer);
  }
}
