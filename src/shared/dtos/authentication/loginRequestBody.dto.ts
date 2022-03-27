import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginRequestBodyDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public phoneOrEmail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public password: string;
}
