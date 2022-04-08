import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

import { PixType } from '@shared/entities/producer/pixType.enum';

export class SetProducerPixRequestBodyDTO {
  @ApiProperty({
    enum: PixType,
    example: [PixType.email, PixType.phone, PixType.cpf, PixType.random],
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(PixType)
  public pixType: PixType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public pixValue: string;
}
