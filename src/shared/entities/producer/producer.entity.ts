import { ApiProperty } from '@nestjs/swagger';
import { Entity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

import { User } from '@shared/entities/user/user.entity';
import { Basket } from '@shared/entities/basket/basket.entity';

@Entity('producers')
export class Producer {
  @ApiProperty()
  @OneToOne(() => User, { primary: true, cascade: true })
  @JoinColumn({ name: 'user_id' })
  public userID: User;

  @ApiProperty()
  @ManyToOne(() => Basket)
  @JoinColumn({ name: 'big_basket' })
  public bigBasket: Basket;

  @ApiProperty()
  @ManyToOne(() => Basket)
  @JoinColumn({ name: 'medium_basket' })
  public mediumBasket: Basket;

  @ApiProperty()
  @ManyToOne(() => Basket)
  @JoinColumn({ name: 'small_basket' })
  public smallBasket: Basket;
}
