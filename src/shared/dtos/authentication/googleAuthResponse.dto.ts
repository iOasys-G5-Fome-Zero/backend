import { User } from '@shared/entities/user/user.entity';

export class GoogleAuthResponseDTO {
  public user: User;

  public accessToken: string;

  public refreshToken: string;
}
