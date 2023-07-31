import { BadRequestException } from '@nestjs/common';
import { CreateHelloCharlyDataInput } from '../../presentation/dtos/create-data.dto';
import { HelloCharlyRepository } from '../repositories/hello-charly.repository';

export class HelloCharlyReceiveDataUseCase {
  constructor(private readonly helloCharlyRepository: HelloCharlyRepository) {}

  async execute(params: any): Promise<boolean> {
    if (!params) {
      throw new BadRequestException('No params');
    }

    // On convertit le body en string
    const createHelloCharlyDataInput: CreateHelloCharlyDataInput = {
      data: JSON.stringify(params),
    };

    return await this.helloCharlyRepository.create(createHelloCharlyDataInput);
  }
}
