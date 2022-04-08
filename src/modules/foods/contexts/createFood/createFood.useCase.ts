import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidV4 } from 'uuid';
import envVariables from '@config/env';

import { FoodRepository } from '@modules/foods/repository/food.repository';

import { CreateFoodRequestBodyDTO } from '@shared/dtos/food/createFoodRequestBody.dto';

import { S3 } from 'aws-sdk';

import { Food } from '@shared/entities/food/food.entity';
import { alreadyExists } from '@shared/constants/errors';

@Injectable()
export class CreateFoodUseCase {
  constructor(
    @InjectRepository(FoodRepository)
    private readonly foodRepository: FoodRepository,
  ) {}

  async execute(
    file,
    { name, priceWeight }: CreateFoodRequestBodyDTO,
  ): Promise<Food> {
    const registeredFood = await this.foodRepository.findFoodByName(name, true);

    if (registeredFood) throw new ConflictException(alreadyExists('food'));

    if (file) {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        throw new ConflictException('only-image-files-allowed');
      }
    }

    try {
      let s3Response;
      if (file) {
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
          Key: `foods/${name}-food.${fileType}`,
          ContentType: file.mimetype,
          Body: file.buffer,
          ACL: 'public-read',
        };

        s3Response = await s3.upload(params).promise();
      }

      const food = await this.foodRepository.createFood({
        id: uuidV4(),
        name,
        imageUrl: s3Response?.Location,
        priceWeight: +priceWeight,
      });

      return food;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
