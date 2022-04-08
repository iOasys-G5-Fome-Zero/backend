import { Request, Controller, HttpCode, HttpStatus, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetProducerBalanceUseCase } from '@modules/producers/contexts/getProducerBalance/getProducerBalance.useCase';
import { Producer } from '@shared/entities/producer/producer.entity';
import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Producers')
@Controller('producers/balance')
export class GetProducerBalanceController {
  constructor(
    private readonly getProducerBalanceUseCase: GetProducerBalanceUseCase,
  ) {}
  @Roles(UserType.producer)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Producer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(@Request() req) {
    const producerBalance = await this.getProducerBalanceUseCase.execute(
      req.user.id,
    );
    return instanceToInstance(producerBalance);
  }
}
