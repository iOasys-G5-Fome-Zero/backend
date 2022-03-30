import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { CreateUserDTO } from '@shared/dtos/user/createUser.dto';
import { EditUserDTO } from '@shared/dtos/user/editUser.dto';
import { TokensDTO } from '@shared/dtos/authentication/saveToken.dto';

import { User } from '@shared/entities/user/user.entity';

import { unexpected } from '@shared/constants/errors';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserByEmailOrPhone(
    phoneOrEmail: string,
  ): Promise<User | undefined> {
    try {
      return await this.findOne({
        where: [{ email: phoneOrEmail }, { phone: phoneOrEmail }],
      });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async findUserById(id: string): Promise<User | undefined> {
    try {
      return await this.findOne(id);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    try {
      const user = this.create(createUserDTO);
      return await this.save(user);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async deleteUserById(id: string): Promise<User | undefined> {
    try {
      const response = await this.createQueryBuilder()
        .softDelete()
        .from(User)
        .where('id = :id', { id })
        .returning('id, first_name, last_name, user_type, cpf')
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async editUserById(userID: string, newUserData: EditUserDTO): Promise<User> {
    try {
      const updatedData = await this.createQueryBuilder('users')
        .update<User>(User, { ...newUserData })
        .where('id = :userID', { userID })
        .returning('first_name, last_name, cpf')
        .updateEntity(true)
        .execute();
      return updatedData.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async saveTokens(userID: string, tokensDTO: TokensDTO): Promise<User> {
    try {
      const user = await this.createQueryBuilder('users')
        .update<User>(User, { ...tokensDTO })
        .where('id = :userID', { userID })
        .returning('*')
        .updateEntity(true)
        .execute();
      return user.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async updateToken(userID: string, token: string): Promise<User> {
    try {
      const user = await this.createQueryBuilder('users')
        .update<User>(User, { token })
        .where('id = :userID', { userID })
        .returning('*')
        .updateEntity(true)
        .execute();
      return user.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async deleteTokens(userID: string): Promise<User> {
    try {
      const user = await this.createQueryBuilder('users')
        .update<User>(User, { token: null, refreshToken: null })
        .where('id = :userID', { userID })
        .returning('*')
        .updateEntity(true)
        .execute();
      return user.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async findTokenByUserID(id: string): Promise<User | undefined> {
    try {
      return await this.findOne({ where: { id }, select: ['token'] });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async findRefreshTokenByUserID(id: string): Promise<User | undefined> {
    try {
      const user = await this.findOne({
        where: { id },
        select: ['refreshToken'],
      });
      return user;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
