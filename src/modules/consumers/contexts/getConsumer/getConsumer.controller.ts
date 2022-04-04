import { Param, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetConsumerUseCase } from '@modules/consumers/contexts/getConsumer/getConsumer.useCase';
import { Consumer } from '@shared/entities/consumer/consumer.entity';
import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Consumers')
@Controller('consumers/:id')
export class GetConsumerController {
  constructor(private readonly getConsumerUseCase: GetConsumerUseCase) {}
  @Roles(UserType.consumer)
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Consumer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(@Param('id') id: string) {
    const consumer = await this.getConsumerUseCase.getConsumerById(id);
    return instanceToInstance(consumer);
  }
}
