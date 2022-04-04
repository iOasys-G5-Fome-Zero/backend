import { BasketSize } from '@shared/entities/basket/basketSize.enum';
import { BasketRate } from '@shared/entities/basket/basketRate.enum';

export class CreateBasketDTO {
  public id: string;

  public size: BasketSize;

  public daysPerDeliver: BasketRate;

  public value: number;
}
