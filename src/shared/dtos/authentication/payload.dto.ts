import { UserType } from '@shared/entities/user/usersType.enum';

export class PayloadDTO {
  public id: string;

  public firstName: string;

  public userType: UserType;
}
