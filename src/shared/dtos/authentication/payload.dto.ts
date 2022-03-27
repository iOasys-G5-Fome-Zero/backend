import { UserType } from '@shared/entities/user/usersType.entity';

export class PayloadDTO {
  public id: string;

  public firstName: string;

  public userType: UserType;
}
