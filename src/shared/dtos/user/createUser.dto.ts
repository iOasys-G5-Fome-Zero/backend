import { UserType } from '@shared/entities/user/usersType.enum';

export class CreateUserDTO {
  public id: string;

  public firstName: string;

  public lastName: string;

  public userType: UserType;

  public email?: string;

  public phone?: string;

  public password?: string;
}
