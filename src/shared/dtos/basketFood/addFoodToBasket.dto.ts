import { Basket } from '@shared/entities/basket/basket.entity';
import { Food } from '@shared/entities/food/food.entity';

export class AddFoodToBasketDTO {
  public id: string;

  public basketID: Basket;

  public foodID: Food;

  public quantity: number;
}
