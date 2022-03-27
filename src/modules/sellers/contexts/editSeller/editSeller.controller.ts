import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { EditSellerUseCase } from '@modules/sellers/contexts/editSeller/editSeller.useCase';
import { Seller } from '@shared/entities/seller/seller.entity';
import { instanceToInstance } from 'class-transformer';

import { Public } from '@shared/decorators/isPublic.decorator';

@ApiTags('Sellers')
@Controller('sellers/edit-seller-info')
export class CreateSellerController {
  constructor(private editSellerUseCase: EditSellerUseCase) {}
}
