import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString, Min } from 'class-validator';

export class AddFoodToBasketRequestBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public basketID: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public foodName: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  public quantity: number;
}
