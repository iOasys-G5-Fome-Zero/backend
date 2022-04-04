import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Check,
} from 'typeorm';

import { UserType } from '@shared/entities/user/usersType.enum';

@Entity('users')
@Unique(['cpf', 'email', 'phone', 'token', 'refreshToken'])
@Check(`"phone" IS NOT NULL OR "email" IS NOT NULL`)
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column({ name: 'first_name' })
  public firstName: string;

  @ApiProperty()
  @Column({ name: 'last_name' })
  public lastName: string;

  @ApiProperty()
  @Column({ name: 'user_type' })
  public userType: UserType;

  @ApiProperty()
  @Column()
  public email: string;

  @ApiProperty()
  @Column()
  public phone: string;

  @ApiProperty()
  @Column()
  public cpf: string;

  @Exclude()
  @Column()
  public password: string;

  @Exclude()
  @Column()
  public token: string;

  @Exclude()
  @Column({ name: 'refresh_token' })
  public refreshToken: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
