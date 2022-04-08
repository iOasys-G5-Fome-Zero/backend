import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsNumberString,
  ValidateIf,
  IsEnum,
  IsOptional,
} from 'class-validator';

import { UserType } from '@shared/entities/user/usersType.enum';

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*=(+){}|'";\\:[><.\],?/-]).{8,}$/;

export class CreateUserRequestBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  public firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @IsOptional()
  public lastName: string;

  @ApiProperty({
    enum: UserType,
    example: [UserType.consumer, UserType.producer],
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(UserType)
  public userType: UserType;

  @ApiProperty()
  @IsEmail()
  @ValidateIf((o) => !o.phone || o.email)
  public email: string;

  @ApiProperty()
  @IsNumberString()
  @ValidateIf((o) => !o.email || o.phone)
  public phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(8, 50)
  @Matches(PASSWORD_REGEX, { message: 'password-is-too-weak' })
  public password: string;
}
