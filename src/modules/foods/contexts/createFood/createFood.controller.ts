import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
  ConflictException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { Express } from 'express';

import { FileInterceptor } from '@nestjs/platform-express';

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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1 * 1024 * 1024, // MB * KB * Bytes = Bytes
      },
      fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimetype = fileTypes.test(file.mimetype);
        if (mimetype) {
          return cb(null, true);
        }
        const error = new ConflictException(
          'Error: Allowed formats: jpeg | jpg | png | gif.',
        );
        cb(error, false);
      },
    }),
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name: {
          type: 'string',
        },
        priceWeight: {
          type: 'string',
        },
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Food,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFoodRequestBodyDTO: CreateFoodRequestBodyDTO,
  ) {
    const food = await this.createFoodUseCase.execute(
      file,
      createFoodRequestBodyDTO,
    );
    return instanceToInstance(food);
  }
}
