import { Repository } from 'typeorm';
import { CreateHelloCharlyDataEntity } from '../dtos/create-data.dto';
import { HelloCharlyDataEntity } from '../entities/data.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';

export interface HelloCharlyDataSource {
  create(params: CreateHelloCharlyDataEntity): Promise<boolean>;
  findAll(): Promise<HelloCharlyDataEntity[]>;
}

export class HelloCharlyDataSourceImpl implements HelloCharlyDataSource {
  constructor(
    @InjectRepository(HelloCharlyDataEntity)
    private readonly helloCharlyDataRepository: Repository<HelloCharlyDataEntity>,
  ) {}

  async create(params: CreateHelloCharlyDataEntity): Promise<boolean> {
    try {
      await this.helloCharlyDataRepository.save(params);

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll(): Promise<HelloCharlyDataEntity[]> {
    return this.helloCharlyDataRepository.find();
  }
}
