import { HelloCharlyDataEntity } from '../entities/data.entity';

export class CreateHelloCharlyDataEntity
  implements Partial<HelloCharlyDataEntity>
{
  data: string;
}
