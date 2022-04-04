import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Check,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Consumer } from '@shared/entities/consumer/consumer.entity';
import { Food } from '@shared/entities/food/food.entity';

@Entity('removed_foods')
@Check(`"quantity" > "0"`)
export class RemovedFood {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @ManyToOne(() => Consumer)
  @JoinColumn({ name: 'consumer_id' })
  public consumerID: Consumer;

  @ApiProperty()
  @ManyToOne(() => Food)
  @JoinColumn({ name: 'food_id' })
  public foodID: Food;

  @ApiProperty()
  @Column()
  public quantity: number;
}
