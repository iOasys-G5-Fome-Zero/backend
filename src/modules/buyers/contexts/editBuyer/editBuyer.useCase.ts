import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidV4 } from 'uuid';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { alreadyExists } from '@shared/constants/errors';

import { Buyer } from '@shared/entities/buyer/buyer.entity';
import { UserRepository } from '@modules/users/repository/user.repository';
import { BuyerRepository } from '@modules/buyers/repository/buyer.repository';

import { UserType } from '@shared/entities/user/usersType.entity';

@Injectable()
export class EditBuyerUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(BuyerRepository)
    private readonly buyerRepository: BuyerRepository,
    @Inject('ENCRYPT_PROVIDER')
    private readonly encryption: BcryptProvider,
    @Inject('CRYPTO_PROVIDER')
    private readonly crypto: CryptoProvider,
  ) {}
}
