import { User } from '@shared/entities/user/user.entity';

export class RefreshResponseDTO {
  public user: User;

  public accessCookie: string;
}
