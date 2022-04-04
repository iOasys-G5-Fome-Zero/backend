import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveFoodFromBasketRequestBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public basketID: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public foodName: string;
}
