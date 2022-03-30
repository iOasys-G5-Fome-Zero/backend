import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidV4 } from 'uuid';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
// import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { UserRepository } from '@modules/users/repository/user.repository';
import { SellerRepository } from '@modules/sellers/repository/seller.repository';
import { BuyerRepository } from '@modules/buyers/repository/buyer.repository';

import { CreateUserRequestBodyDTO } from '@shared/dtos/user/createUserRequestBody.dto';

import { User } from '@shared/entities/user/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(BuyerRepository)
    private readonly buyerRepository: BuyerRepository,
    @InjectRepository(SellerRepository)
    private readonly sellerRepository: SellerRepository,
    // @Inject('CRYPTO_PROVIDER')
    // private readonly crypto: CryptoProvider,
    @Inject('ENCRYPT_PROVIDER')
    private readonly encryption: BcryptProvider,
  ) {}

  async execute({
    firstName,
    lastName,
    phone,
    email,
    userType,
    password,
  }: CreateUserRequestBodyDTO): Promise<User> {
    const hashedPassword = this.encryption.createHash(password);

    const user = await this.userRepository.createUser({
      id: uuidV4(),
      firstName,
      lastName,
      phone,
      email,
      userType,
      password: hashedPassword,
    });

    const specialization = {
      buyer: (user) => this.buyerRepository.createBuyer(user),
      seller: (user) => this.sellerRepository.createSeller(user),
    };

    await specialization[user.userType]({ userID: user.id }); // create SPECIALIZATION

    return user;
  }
}
