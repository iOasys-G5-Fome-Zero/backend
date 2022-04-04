import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Check,
} from 'typeorm';

import { User } from '@shared/entities/user/user.entity';
import { Basket } from '@shared/entities/basket/basket.entity';
import { Producer } from '@shared/entities/producer/producer.entity';

@Entity('consumers')
@Check(`"cryptoCoins" >= "0"`)
export class Consumer {
  @ApiProperty()
  @OneToOne(() => User, { primary: true, cascade: true })
  @JoinColumn({ name: 'user_id' })
  public userID: User;

  @ApiProperty()
  @ManyToOne(() => Basket)
  @JoinColumn({ name: 'basket_id' })
  public basketID: Basket;

  @ApiProperty()
  @ManyToOne(() => Producer)
  @JoinColumn({ name: 'basket_producer_id' })
  public basketProducerID: Producer;

  @ApiProperty()
  @Column({ name: 'crypto_coins' })
  public cryptoCoins: number;

  @ApiProperty()
  @Column({ name: 'credited' })
  public credited: boolean;
}
