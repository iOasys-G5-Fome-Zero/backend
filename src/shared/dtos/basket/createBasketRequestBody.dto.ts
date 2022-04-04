import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString, Min, IsEnum } from 'class-validator';

import { BasketSize } from '@shared/entities/basket/basketSize.enum';
import { BasketRate } from '@shared/entities/basket/basketRate.enum';

export class CreateBasketRequestBodyDTO {
  @ApiProperty({
    enum: BasketSize,
    example: [BasketSize.big, BasketSize.medium, BasketSize.small],
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(BasketSize)
  public size: BasketSize;

  @ApiProperty({
    enum: BasketRate,
    example: [BasketRate.biweekly, BasketRate.weekly],
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(BasketRate)
  public daysPerDeliver: BasketRate;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  public value: number;
}
