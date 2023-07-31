import { HelloCharlyData } from '../models/data.model';
import { HelloCharlyRepository } from '../repositories/hello-charly.repository';

export class HelloCharlyGetDatasUseCase {
  constructor(private readonly helloCharlyRepository: HelloCharlyRepository) {}
  async execute(): Promise<HelloCharlyData[]> {
    return await this.helloCharlyRepository.findAll();
  }
}
