import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseInterceptors,
  UploadedFile,
  ConflictException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

import { UploadReceiptUseCase } from '@modules/consumers/contexts/uploadReceipt/uploadReceipt.useCase';

import { Consumer } from '@shared/entities/consumer/consumer.entity';

import { instanceToInstance } from 'class-transformer';

import { Roles } from '@shared/decorators/roles.decorator';

import { UserType } from '@shared/entities/user/usersType.enum';

@ApiTags('Consumers')
@Controller('consumers/receipt')
export class UploadReceiptController {
  constructor(private readonly uploadReceiptUseCase: UploadReceiptUseCase) {}

  @Post('upload')
  @Roles(UserType.consumer)
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
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Consumer,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async execute(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const consumer = await this.uploadReceiptUseCase.execute(file, req.user.id);
    return instanceToInstance(consumer);
  }
}
