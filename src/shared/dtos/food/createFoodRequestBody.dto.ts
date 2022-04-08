import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsNumberString } from 'class-validator';

export class CreateFoodRequestBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  public name: string;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  public priceWeight: string;
}
