import { Controller, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetRemovedFoodsUseCase } from '@modules/consumers/contexts/getRemovedFoods/GetRemovedFoods.useCase';

import { RemovedFood } from '@shared/entities/removedFood/removedFood.entity';

import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Consumers')
@Controller('consumers/basket/removed-foods')
export class GetRemovedFoodsController {
  constructor(
    private readonly getRemovedFoodsUseCase: GetRemovedFoodsUseCase,
  ) {}
  @Roles(UserType.consumer)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    isArray: true,
    type: RemovedFood,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(@Request() req) {
    const removedFoods = await this.getRemovedFoodsUseCase.execute(req.user.id);
    return instanceToInstance(removedFoods);
  }
}
