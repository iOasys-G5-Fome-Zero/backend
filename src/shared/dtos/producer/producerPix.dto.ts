import { PixType } from '@shared/entities/producer/pixType.enum';

export class ProducerPixDTO {
  public userID: string;

  public pixType: PixType;

  public pixValue?: string;
}
