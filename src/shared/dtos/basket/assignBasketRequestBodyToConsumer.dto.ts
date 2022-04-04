import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssignBasketRequestToConsumerBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public basketID: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public producerID: string;
}
