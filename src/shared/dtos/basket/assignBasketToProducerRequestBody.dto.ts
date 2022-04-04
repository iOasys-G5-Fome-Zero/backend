import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssignBasketToProducerRequestBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public basketID: string;
}
