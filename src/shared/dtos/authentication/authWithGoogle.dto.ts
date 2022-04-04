import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

import { UserType } from '@shared/entities/user/usersType.enum';

export class AuthWithGoogleDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(UserType)
  public userType: UserType;
}
