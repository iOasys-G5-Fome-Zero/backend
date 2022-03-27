import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import { User } from '@shared/entities/user/user.entity';

@Entity('buyers')
export class Buyer {
  @OneToOne(() => User, { primary: true, cascade: true })
  @JoinColumn({ name: 'user_id' })
  public userID: User;
}
