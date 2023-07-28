import { Module } from '@nestjs/common';
import { HelloCharlyController } from './presentation/controller/hello-charly.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelloCharlieDatasourceImpl } from './data/datasources/hello-charly.datasource';
import { HelloCharlyDataEntity } from './data/entities/data.entity';
import { HelloCharlyReceiveDataUseCase } from './domain/usecases/receive-data.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HelloCharlieDatasourceImpl,
      HelloCharlyDataEntity,
    ]),
  ],
  controllers: [HelloCharlyController],
  providers: [
    HelloCharlieDatasourceImpl,
    {
      provide: HelloCharlyReceiveDataUseCase,
      inject: [HelloCharlieDatasourceImpl],
      useFactory: (helloCharlyDatasource: HelloCharlieDatasourceImpl) =>
        new HelloCharlyReceiveDataUseCase(helloCharlyDatasource),
    },
  ],
})
export class HelloCharlyModule {}
