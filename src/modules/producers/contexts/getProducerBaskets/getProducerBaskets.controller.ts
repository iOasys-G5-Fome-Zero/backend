import { Controller, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetProducerBasketsUseCase } from '@modules/producers/contexts/getProducerBaskets/getProducerBaskets.useCase';
import { Producer } from '@shared/entities/producer/producer.entity';
import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Producers')
@Controller('producers/get-producer-baskets')
export class GetProducerBasketsController {
  constructor(
    private readonly getProducerBasketsUseCase: GetProducerBasketsUseCase,
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
    const producer = await this.getProducerBasketsUseCase.execute(req.user.id);
    return instanceToInstance(producer);
  }
}
