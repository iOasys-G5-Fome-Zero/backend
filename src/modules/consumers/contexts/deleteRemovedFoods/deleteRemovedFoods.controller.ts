import {
  Controller,
  HttpCode,
  HttpStatus,
  Delete,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { DeleteRemovedFoodsUseCase } from '@modules/consumers/contexts/deleteRemovedFoods/deleteRemovedFoods.useCase';

import { RemovedFood } from '@shared/entities/removedFood/removedFood.entity';

import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Consumers')
@Controller('consumers/basket/delete-removed-foods')
export class DeleteRemovedFoodsController {
  constructor(
    private readonly deleteRemovedFoodsUseCase: DeleteRemovedFoodsUseCase,
  ) {}
  @Roles(UserType.consumer)
  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    isArray: true,
    type: RemovedFood,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(@Request() req) {
    const removedFoods = await this.deleteRemovedFoodsUseCase.execute(
      req.user.id,
    );
    return instanceToInstance(removedFoods);
  }
}
