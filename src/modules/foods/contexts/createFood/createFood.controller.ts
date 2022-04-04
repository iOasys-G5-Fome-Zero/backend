import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateFoodRequestBodyDTO } from '@shared/dtos/food/createFoodRequestBody.dto';

import { Food } from '@shared/entities/food/food.entity';

import { instanceToInstance } from 'class-transformer';

import { CreateFoodUseCase } from '@modules/foods/contexts/createFood/createFood.useCase';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Foods')
@Controller('foods/new-food')
export class CreateFoodController {
  constructor(private readonly createFoodUseCase: CreateFoodUseCase) {}

  @Post()
  @Roles(UserType.producer)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Food,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async create(
    @Body() createFoodRequestBodyDTO: CreateFoodRequestBodyDTO,
  ) {
    const food = await this.createFoodUseCase.execute(createFoodRequestBodyDTO);
    return instanceToInstance(food);
  }
}
