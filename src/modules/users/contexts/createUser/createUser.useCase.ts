import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidV4 } from 'uuid';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
// import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { UserRepository } from '@modules/users/repository/user.repository';
import { ProducerRepository } from '@modules/producers/repository/producer.repository';
import { ConsumerRepository } from '@modules/consumers/repository/consumer.repository';

import { CreateUserRequestBodyDTO } from '@shared/dtos/user/createUserRequestBody.dto';

import { User } from '@shared/entities/user/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(ConsumerRepository)
    private readonly consumerRepository: ConsumerRepository,
    @InjectRepository(ProducerRepository)
    private readonly producerRepository: ProducerRepository,
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
      consumer: (user) => this.consumerRepository.createConsumer(user),
      producer: (user) => this.producerRepository.createProducer(user),
    };

    await specialization[user.userType]({ userID: user.id }); // create SPECIALIZATION

    return user;
  }
}
