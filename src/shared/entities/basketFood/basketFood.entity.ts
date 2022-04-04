import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  Column,
  Check,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Food } from '@shared/entities/food/food.entity';
import { Basket } from '@shared/entities/basket/basket.entity';

@Entity('basket_foods')
@Check(`"quantity" > "0"`)
export class BasketFood {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @ManyToOne(() => Basket)
  @JoinColumn({ name: 'basket_id' })
  public basketID: Basket;

  @ApiProperty()
  @ManyToOne(() => Food)
  @JoinColumn({ name: 'food_id' })
  public foodID: Food;

  @ApiProperty()
  @Column({ name: 'quantity' })
  public quantity: number;
}
