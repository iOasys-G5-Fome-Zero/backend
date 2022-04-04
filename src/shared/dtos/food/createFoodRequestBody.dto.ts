import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class CreateFoodRequestBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  public name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  public priceWeight: number;
}
