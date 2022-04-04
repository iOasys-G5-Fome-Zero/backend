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
  ApiBody,
} from '@nestjs/swagger';

import { SetRemovedFoodUseCase } from '@modules/consumers/contexts/setRemovedFood/setRemovedFood.useCase';

import { RemovedFood } from '@shared/entities/removedFood/removedFood.entity';

import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

import { SetRemovedFoodRequestBodyDTO } from '@shared/dtos/removedFood/setRemovedFoodRequestBody.dto';

@ApiTags('Consumers')
@Controller('consumers/basket/set-removed-foods')
export class SetRemovedFoodController {
  constructor(private readonly setRemovedFoodUseCase: SetRemovedFoodUseCase) {}
  @Roles(UserType.consumer)
  @Post()
  @ApiBody({ type: [SetRemovedFoodRequestBodyDTO] })
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    isArray: true,
    type: RemovedFood,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(
    @Body() setRemovedFoodRequestBodyDTO: SetRemovedFoodRequestBodyDTO[],
    @Request() req,
  ) {
    const removedFood = await this.setRemovedFoodUseCase.setRemovedFood(
      req.user.id,
      setRemovedFoodRequestBodyDTO,
    );
    return instanceToInstance(removedFood);
  }
}
