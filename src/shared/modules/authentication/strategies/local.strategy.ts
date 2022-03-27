import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from '@shared/entities/user/user.entity';

import { AuthService } from '@shared/modules/authentication/services/Auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'phoneOrEmail',
      passwordField: 'password',
    });
  }

  async validate(phoneOrEmail: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(phoneOrEmail, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
