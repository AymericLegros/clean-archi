import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './infrastructure/database/database.module';
import { join } from 'path';
import { TodoModule } from './modules/todos/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TodoModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
