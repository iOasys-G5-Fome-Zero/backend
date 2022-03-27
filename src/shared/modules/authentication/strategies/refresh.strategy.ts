import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import envVariables from '@config/env';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';

import { UserRepository } from '@modules/users/repository/user.repository';

import { PayloadDTO } from '@shared/dtos/authentication/payload.dto';

@Injectable()
export class RefreshStrategy extends PassportStrategy(
  Strategy,
  'refresh-token-auth',
) {
  constructor(
    @Inject('ENCRYPT_PROVIDER')
    private readonly encryption: BcryptProvider,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.Refresh,
      ]),
      ignoreExpiration: false,
      secretOrKey: envVariables().refreshSecret,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: PayloadDTO): Promise<PayloadDTO> {
    const refreshToken = req?.cookies?.Refresh;

    const user = await this.userRepository.findRefreshTokenByUserID(payload.id);

    if (!user.refreshToken) {
      throw new UnauthorizedException();
    }

    const hashedRefreshTokenFromDB = user.refreshToken;
    const validRefreshToken = await this.encryption.compareHash(
      refreshToken,
      hashedRefreshTokenFromDB,
    );

    if (!validRefreshToken) {
      throw new UnauthorizedException();
    }

    return {
      id: payload.id,
      firstName: payload.firstName,
      userType: payload.userType,
    };
  }
}
