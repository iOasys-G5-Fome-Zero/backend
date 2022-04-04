import { Param, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetProducerUseCase } from '@modules/producers/contexts/getProducer/getProducer.useCase';
import { Producer } from '@shared/entities/producer/producer.entity';
import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Producers')
@Controller('producers/:id')
export class GetProducerController {
  constructor(private readonly getProducerUseCase: GetProducerUseCase) {}
  @Roles(UserType.producer)
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Producer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(@Param('id') id: string) {
    const producer = await this.getProducerUseCase.getProducerById(id);
    return instanceToInstance(producer);
  }
}
