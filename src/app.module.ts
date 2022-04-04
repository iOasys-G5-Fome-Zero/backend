import { Module } from '@nestjs/common';
import envConfig from '@config/env';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthenticationModule } from '@shared/modules/authentication/authentication.module';
import { AuthorizationModule } from '@shared/modules/authorization/authorization.module';

import { UserModule } from '@modules/users/user.module';
import { ConsumerModule } from '@modules/consumers/consumer.module';
import { ProducerModule } from '@modules/producers/producer.module';
import { FoodModule } from '@modules/foods/food.module';
import { BasketModule } from '@modules/baskets/basket.module';

import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';

import * as winston from 'winston';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
    TypeOrmModule.forRoot(),
    AuthenticationModule,
    AuthorizationModule,
    UserModule,
    ConsumerModule,
    ProducerModule,
    FoodModule,
    BasketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
