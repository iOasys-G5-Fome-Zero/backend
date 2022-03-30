import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
// import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { CreateUserController } from './contexts/createUser/createUser.controller';

import { CreateUserUseCase } from './contexts/createUser/createUser.useCase';

import { UserRepository } from '@modules/users/repository/user.repository';
import { SellerRepository } from '@modules/sellers/repository/seller.repository';
import { BuyerRepository } from '@modules/buyers/repository/buyer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      SellerRepository,
      BuyerRepository,
    ]),
    BcryptProvider,
    // CryptoProvider,
  ],
  providers: [
    { provide: 'ENCRYPT_PROVIDER', useClass: BcryptProvider },
    // { provide: 'CRYPTO_PROVIDER', useClass: CryptoProvider },
    CreateUserUseCase,
  ],
  controllers: [CreateUserController],
})
export class UserModule {}
