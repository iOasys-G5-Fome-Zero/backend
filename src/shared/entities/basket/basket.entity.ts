import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Check,
} from 'typeorm';

import { BasketSize } from '@shared/entities/basket/basketSize.enum';
import { BasketRate } from '@shared/entities/basket/basketRate.enum';

@Entity('baskets')
@Check(`"value" > "0"`)
export class Basket {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column()
  public size: BasketSize;

  @ApiProperty()
  @Column({ name: 'days_per_deliver' })
  public daysPerDeliver: BasketRate;

  @ApiProperty()
  @Column()
  public value: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
