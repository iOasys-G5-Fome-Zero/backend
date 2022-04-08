import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { SetProducerPixUseCase } from '@modules/producers/contexts/setProducerPix/setProducerPix.useCase';

import { Producer } from '@shared/entities/producer/producer.entity';
import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

import { SetProducerPixRequestBodyDTO } from '@shared/dtos/producer/setProducerPixRequestBody.dto';

@ApiTags('Producers')
@Controller('producers/pix')
export class SetProducerPixController {
  constructor(private readonly setProducerPixUseCase: SetProducerPixUseCase) {}
  @Roles(UserType.producer)
  @Post('set-pix')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Producer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(
    @Body() setProducerPixRequestBodyDTO: SetProducerPixRequestBodyDTO,
    @Request() req,
  ) {
    const producer = await this.setProducerPixUseCase.execute(
      req.user.id,
      setProducerPixRequestBodyDTO,
    );
    return instanceToInstance(producer);
  }
}
