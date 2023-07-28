import { CreateHelloCharlyDataEntity } from '../../data/dtos/create-data.dto';

export class CreateHelloCharlyDataInput extends CreateHelloCharlyDataEntity {
  data: string;
}
