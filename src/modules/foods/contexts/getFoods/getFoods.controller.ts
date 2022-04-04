import { Controller, HttpCode, HttpStatus, Query, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';

import { Food } from '@shared/entities/food/food.entity';

import { instanceToInstance } from 'class-transformer';

import { GetFoodsUseCase } from '@modules/foods/contexts/getFoods/getFoods.useCase';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Foods')
@Controller('foods/list')
export class GetFoodsController {
  constructor(private readonly getFoodsUseCase: GetFoodsUseCase) {}

  @Get()
  @Roles(UserType.producer)
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'name', required: false })
  @ApiCreatedResponse({
    type: [Food],
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(@Query() query: { name: string }) {
    const food = await this.getFoodsUseCase.execute(query.name);
    return instanceToInstance(food);
  }
}
