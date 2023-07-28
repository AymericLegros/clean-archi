import { HelloCharlyRepository } from '../../domain/repositories/hello-charly.repository';
import { HelloCharlyDataSource } from '../datasources/hello-charly.datasource';
import { CreateHelloCharlyDataEntity } from '../dtos/create-data.dto';

export class HelloCharlyRepositoryImpl implements HelloCharlyRepository {
  constructor(private readonly helloCharlyDatasource: HelloCharlyDataSource) {}

  async create(params: CreateHelloCharlyDataEntity): Promise<boolean> {
    return await this.helloCharlyDatasource.create(params);
  }
}
