// database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pass',
      database: 'e2c-dev',
      entities: [__dirname + '/../**/*.model{.ts,.js}'],
      synchronize: true,
      migrationsRun: true,
      migrations: ['src/database/migrations/*.ts'],
    }),
  ],
})
export class DatabaseModule {}
