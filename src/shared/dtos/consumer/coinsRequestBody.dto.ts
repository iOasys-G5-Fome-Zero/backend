import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CoinsRequestBodyDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  public coins: number;
}
