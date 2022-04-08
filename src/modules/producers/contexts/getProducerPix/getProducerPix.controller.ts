import { Controller, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetProducerPixUseCase } from '@modules/producers/contexts/getProducerPix/getProducerPix.useCase';

import { Producer } from '@shared/entities/producer/producer.entity';
import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Producers')
@Controller('producers/pix')
export class GetProducerPixController {
  constructor(private readonly getProducerPixUseCase: GetProducerPixUseCase) {}
  @Roles(UserType.producer)
  @Get('my-pix-keys')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Producer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(@Request() req) {
    const producer = await this.getProducerPixUseCase.execute(req.user.id);
    return instanceToInstance(producer);
  }
}
