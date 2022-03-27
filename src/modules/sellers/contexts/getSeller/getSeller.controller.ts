import { Param, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetSellerUseCase } from './getSeller.useCase';
import { Seller } from '@shared/entities/seller/seller.entity';
import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.entity';

@ApiTags('Sellers')
@Controller('sellers/:id')
export class GetSellerController {
  constructor(private readonly getSellerUseCase: GetSellerUseCase) {}
  @Roles(UserType.seller)
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Seller,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(@Param('id') id: string) {
    const seller = await this.getSellerUseCase.getSellerById(id);
    return instanceToInstance(seller);
  }
}
