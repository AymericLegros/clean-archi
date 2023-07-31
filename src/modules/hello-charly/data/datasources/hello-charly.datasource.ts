import { Repository } from 'typeorm';
import { CreateHelloCharlyDataEntity } from '../dtos/create-data.dto';
import { HelloCharlyDataEntity } from '../entities/data.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';

export interface HelloCharlyDataSource {
  create(params: CreateHelloCharlyDataEntity): Promise<boolean>;
  findAll(): Promise<HelloCharlyDataEntity[]>;
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
      throw new InternalServerErrorException(error);
    }
  }

  findAll(): Promise<HelloCharlyDataEntity[]> {
    return this.helloCharlyRepository.find();
  }
}
