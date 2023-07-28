import { Repository } from 'typeorm';
import { CreateHelloCharlyDataEntity } from '../dtos/create-data.dto';
import { HelloCharlyDataEntity } from '../entities/data.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface HelloCharlyDataSource {
  create(params: CreateHelloCharlyDataEntity): Promise<boolean>;
}

export class HelloCharlieDatasourceImpl implements HelloCharlyDataSource {
  constructor(
    @InjectRepository(HelloCharlyDataEntity)
    private readonly helloCharlyRepository: Repository<HelloCharlyDataEntity>,
  ) {}
  async create(params: CreateHelloCharlyDataEntity): Promise<boolean> {
    try {
      await this.helloCharlyRepository.save(params);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
