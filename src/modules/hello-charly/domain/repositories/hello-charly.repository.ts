import { CreateHelloCharlyDataInput } from '../../presentation/dtos/create-data.dto';
import { HelloCharlyData } from '../models/data.model';

export interface HelloCharlyRepository {
  create(params: CreateHelloCharlyDataInput): Promise<boolean>;
  findAll(): Promise<HelloCharlyData[]>;
}
