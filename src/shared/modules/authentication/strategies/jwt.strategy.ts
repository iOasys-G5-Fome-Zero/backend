import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import envVariables from '@config/env';
import { InjectRepository } from '@nestjs/typeorm';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { UserRepository } from '@modules/users/repository/user.repository';

import { PayloadDTO } from '@shared/dtos/authentication/payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('ENCRYPT_PROVIDER')
    private readonly encryption: BcryptProvider,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.Authentication,
      ]),
      ignoreExpiration: false,
      secretOrKey: envVariables().jwtSecret,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: PayloadDTO): Promise<PayloadDTO> {
    const accessToken = req?.cookies?.Authentication;

    const user = await this.userRepository.findTokenByUserID(payload.id);

    if (!user.token) {
      throw new UnauthorizedException();
    }

    const hashedAccessTokenFromDB = user.token;

    const validAccessToken = await this.encryption.compareHash(
      accessToken,
      hashedAccessTokenFromDB,
    );

    if (!validAccessToken) {
      throw new UnauthorizedException();
    }

    return {
      id: payload.id,
      firstName: payload.firstName,
      userType: payload.userType,
    };
  }
}
