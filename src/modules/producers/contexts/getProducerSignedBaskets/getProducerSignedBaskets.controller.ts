import { Controller, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetProducerSignedBasketsUseCase } from '@modules/producers/contexts/getProducerSignedBaskets/getProducerSignedBaskets.useCase';
import { Consumer } from '@shared/entities/consumer/consumer.entity';
import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Producers')
@Controller('producers/get-producer-signed-baskets')
export class GetProducerSignedBasketsController {
  constructor(
    private readonly getProducerSignedBasketsUseCase: GetProducerSignedBasketsUseCase,
  ) {}
  @Roles(UserType.producer)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Consumer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(@Request() req) {
    const producersignedBaskets =
      await this.getProducerSignedBasketsUseCase.execute(req.user.id);
    return instanceToInstance(producersignedBaskets);
  }
}
