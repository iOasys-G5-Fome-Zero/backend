import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import envVariables from '@config/env';

import { ConsumerRepository } from '@modules/consumers/repository/consumer.repository';

import { S3 } from 'aws-sdk';

import { Consumer } from '@shared/entities/consumer/consumer.entity';

@Injectable()
export class UploadReceiptUseCase {
  constructor(
    @InjectRepository(ConsumerRepository)
    private readonly consumerRepository: ConsumerRepository,
  ) {}

  async execute(file, userID: string): Promise<Consumer> {
    if (!file) {
      throw new ConflictException('no-file');
    }

    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      throw new ConflictException('only-image-files-allowed');
    }

    const s3 = new S3({
      apiVersion: '2006-03-01',
      accessKeyId: envVariables().fileBaseKey,
      secretAccessKey: envVariables().fileBaseSecret,
      endpoint: 'https://s3.filebase.com',
      region: 'us-east-1',
      s3ForcePathStyle: true,
    });

    const nameArr = file.originalname.split('.');

    const fileType = nameArr[nameArr.length - 1];

    const params = {
      Bucket: 'ioasys-g5-fome-zero',
      Key: `receipts/${userID}-receipt.${fileType}`,
      ContentType: file.mimetype,
      Body: file.buffer,
      ACL: 'public-read',
    };

    try {
      const s3Response = await s3.upload(params).promise();
      const consumer = await this.consumerRepository.handleReceipt(
        userID,
        s3Response.Location,
      );
      return consumer;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
