import { Param, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetBuyerUseCase } from './getBuyer.useCase';
import { Buyer } from '@shared/entities/buyer/buyer.entity';
import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.entity';

@ApiTags('Buyers')
@Controller('buyers/:id')
export class GetBuyerController {
  constructor(private readonly getBuyerUseCase: GetBuyerUseCase) {}
  @Roles(UserType.buyer)
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Buyer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(@Param('id') id: string) {
    const buyer = await this.getBuyerUseCase.getBuyerById(id);
    return instanceToInstance(buyer);
  }
}
