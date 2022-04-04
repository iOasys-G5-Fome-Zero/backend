import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString, Min } from 'class-validator';

export class SetRemovedFoodRequestBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public foodID: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  public quantity: number;
}
