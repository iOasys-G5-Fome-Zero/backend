import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { EditBuyerUseCase } from '@modules/buyers/contexts/editBuyer/editBuyer.useCase';
import { Buyer } from '@shared/entities/buyer/buyer.entity';
import { instanceToInstance } from 'class-transformer';

import { Public } from '@shared/decorators/isPublic.decorator';

@ApiTags('Buyers')
@Controller('buyers/new-buyer')
export class EditBuyerController {
  constructor(private editBuyerUseCase: EditBuyerUseCase) {}
}
