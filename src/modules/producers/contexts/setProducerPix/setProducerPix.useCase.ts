import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProducerRepository } from '@modules/producers/repository/producer.repository';
import { Producer } from '@shared/entities/producer/producer.entity';

import { SetProducerPixRequestBodyDTO } from '@shared/dtos/producer/setProducerPixRequestBody.dto';

@Injectable()
export class SetProducerPixUseCase {
  constructor(
    @InjectRepository(ProducerRepository)
    private readonly producerRepository: ProducerRepository,
  ) {}

  async execute(
    userID: string,
    setProducerPixRequestBodyDTO: SetProducerPixRequestBodyDTO,
  ): Promise<Producer> {
    const producer = this.producerRepository.setProducerPix({
      userID,
      ...setProducerPixRequestBodyDTO,
    });
    return producer;
  }
}
