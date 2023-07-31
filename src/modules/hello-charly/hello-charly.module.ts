import { Module } from '@nestjs/common';
import { HelloCharlyController } from './presentation/controller/hello-charly.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelloCharlyDataSourceImpl } from './data/datasources/hello-charly.datasource';
import { HelloCharlyDataEntity } from './data/entities/data.entity';
import { HelloCharlyReceiveDataUseCase } from './domain/usecases/receive-data.usecase';
import { HelloCharlyGetDatasUseCase } from './domain/usecases/get-datas.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HelloCharlyDataSourceImpl,
      HelloCharlyDataEntity,
    ]),
  ],
  controllers: [HelloCharlyController],
  providers: [
    HelloCharlyDataSourceImpl,
    {
      provide: HelloCharlyReceiveDataUseCase,
      inject: [HelloCharlyDataSourceImpl],
      useFactory: (helloCharlyDatasource: HelloCharlyDataSourceImpl) =>
        new HelloCharlyReceiveDataUseCase(helloCharlyDatasource),
    },
    {
      provide: HelloCharlyGetDatasUseCase,
      inject: [HelloCharlyDataSourceImpl],
      useFactory: (helloCharlyDatasource: HelloCharlyDataSourceImpl) =>
        new HelloCharlyGetDatasUseCase(helloCharlyDatasource),
    },
  ],
})
export class HelloCharlyModule {}
