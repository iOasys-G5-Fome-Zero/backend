import { User } from '@shared/entities/user/user.entity';

export class LoginResponseDTO {
  public user: User;

  public accessCookie: string;

  public refreshCookie: string;
}
