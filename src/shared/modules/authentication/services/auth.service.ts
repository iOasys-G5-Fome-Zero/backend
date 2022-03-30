import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import envVariables from '@config/env';
import { v4 as uuidV4 } from 'uuid';

import { PayloadDTO } from '@shared/dtos/authentication/payload.dto';
import { LoginResponseDTO } from '@shared/dtos/authentication/loginResponse.dto';
import { RefreshResponseDTO } from '@shared/dtos/authentication/refreshResponse.dto';
import { AuthWithGoogleDTO } from '@shared/dtos/authentication/authWithGoogle.dto';

import { User } from '@shared/entities/user/user.entity';

import { requestNotCompleted } from '@shared/constants/errors';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
// import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { UserRepository } from '@modules/users/repository/user.repository';
import { BuyerRepository } from '@modules/buyers/repository/buyer.repository';
import { SellerRepository } from '@modules/sellers/repository/seller.repository';

import { google, Auth } from 'googleapis';

@Injectable()
export class AuthService {
  constructor(
    @Inject('GOOGLE_PROVIDER')
    private readonly oauthClient: Auth.OAuth2Client,
    @Inject('ENCRYPT_PROVIDER')
    private readonly encryption: BcryptProvider,
    // @Inject('CRYPTO_PROVIDER')
    // private readonly crypto: CryptoProvider,
    private readonly jwtService: JwtService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(BuyerRepository)
    private readonly buyerRepository: BuyerRepository,
    @InjectRepository(SellerRepository)
    private readonly sellerRepository: SellerRepository,
  ) {}
  async authenticateWithGoogle({
    code,
    userType,
  }: AuthWithGoogleDTO): Promise<LoginResponseDTO | User> {
    try {
      const { tokens } = await this.oauthClient.getToken(code);
      const userData = await this.getUserData(tokens.access_token);

      let user = await this.userRepository.findUserByEmailOrPhone(
        userData.email,
      );

      if (!user) {
        user = await this.userRepository.createUser({
          id: uuidV4(),
          firstName: userData.name,
          lastName: userData.family_name,
          email: userData.email,
          userType,
        });

        const specialization = {
          buyer: (user) => this.buyerRepository.createBuyer(user),
          seller: (user) => this.sellerRepository.createSeller(user),
        };

        await specialization[user.userType]({ userID: user.id }); // create SPECIALIZATION
      }

      return user;
    } catch (error) {
      throw new ConflictException('Invalid-request');
    }
  }

  async validateUser(
    phoneOrEmail: string,
    password: string,
  ): Promise<User | null> {
    // const encryptedPhoneOrEmail = this.crypto.encrypt(phoneOrEmail);

    const user = await this.userRepository.findUserByEmailOrPhone(phoneOrEmail);

    let validPassword: boolean;

    if (user) {
      validPassword = await this.encryption.compareHash(
        password,
        user.password,
      );
    }

    if (user && validPassword) {
      return user;
    }
    return null;
  }

  async login(reqUser: User): Promise<LoginResponseDTO> {
    const payload = {
      id: reqUser.id,
      firstName: reqUser.firstName,
      userType: reqUser.userType,
    };

    const { accessCookie, accessToken } = await this.getAccessCookie(payload);
    const { refreshCookie, refreshToken } = await this.getRefreshCookie(
      payload,
    );

    const hashedAccessToken = this.encryption.createHash(accessToken);
    const hashedRefresToken = this.encryption.createHash(refreshToken);

    const user = await this.userRepository.saveTokens(reqUser.id, {
      token: hashedAccessToken,
      refreshToken: hashedRefresToken,
    });

    if (!user) {
      throw new ConflictException(
        requestNotCompleted('saveTokens:auth.service'),
      );
    }

    return { user, accessCookie, refreshCookie };
  }

  logout(): string[] {
    return this.getLogOutCookie();
  }

  async refresh(payload: PayloadDTO): Promise<RefreshResponseDTO> {
    const { accessCookie, accessToken } = await this.getAccessCookie(payload);

    const hashedAccessToken = this.encryption.createHash(accessToken);

    const user = await this.userRepository.updateToken(
      payload.id,
      hashedAccessToken,
    );

    if (!user) {
      throw new ConflictException(
        requestNotCompleted('updateJwtToken:auth.service'),
      );
    }

    return { user, accessCookie };
  }

  async removeTokensFromUser(userID: string): Promise<User> {
    const user = await this.userRepository.deleteTokens(userID);
    if (!user) {
      throw new ConflictException(
        requestNotCompleted('removeTokensFromUser:auth.service'),
      );
    }
    return user;
  }

  // =========================================================================================
  // PRIVATE METHODS
  // =========================================================================================
  private async getAccessCookie({ id, firstName, userType }: PayloadDTO) {
    const payload = { id, firstName, userType };
    const expirationTime = envVariables().expiresIn;
    const accessToken = this.jwtService.sign(payload, {
      secret: envVariables().jwtSecret,
      expiresIn: expirationTime,
    });
    const accessCookie = `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${expirationTime}`;
    return { accessCookie, accessToken };
  }

  private async getRefreshCookie({ id, firstName, userType }: PayloadDTO) {
    const payload = { id, firstName, userType };
    const expirationTime = envVariables().refreshExpiresIn;
    const refreshToken = this.jwtService.sign(payload, {
      secret: envVariables().refreshSecret,
      expiresIn: expirationTime,
    });
    const refreshCookie = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${expirationTime}`;
    return { refreshCookie, refreshToken };
  }

  private getLogOutCookie(): string[] {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  private async getUserData(access_token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({ access_token });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });

    return userInfoResponse.data;
  }
}
