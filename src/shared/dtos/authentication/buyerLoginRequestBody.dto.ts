import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class buyerLoginRequestBodyDTO {
  @ApiProperty()
  @IsEmail()
  @Length(3, 100)
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public password: string;
}
