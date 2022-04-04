import {
  Controller,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Food } from '@shared/entities/food/food.entity';

import { instanceToInstance } from 'class-transformer';

import { DeleteFoodUseCase } from './deleteFood.useCase';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Foods')
@Controller('foods/delete/:name')
export class DeleteFoodController {
  constructor(private readonly deleteFoodUseCase: DeleteFoodUseCase) {}

  @Delete()
  @Roles(UserType.producer)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Food,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async delete(@Param('name') name: string) {
    const food = await this.deleteFoodUseCase.execute(name);
    return instanceToInstance(food);
  }
}
