import { CreateHelloCharlyDataInput } from '../../presentation/dtos/create-data.dto';

export interface HelloCharlyRepository {
  create(params: CreateHelloCharlyDataInput): Promise<boolean>;
}
