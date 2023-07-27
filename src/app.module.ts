import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './infrastructure/database/database.module';
import { DemoModule } from './modules/demo/demo.module';

import configuration from './infrastructure/configuration';

@Module({
  imports: [
    // CONFIGURATION DE L'ENVIRONNEMENT
    ConfigModule.forRoot({
      load: [configuration],
    }),

    // CONFIGURATION DE LA BASE DE DONNEES
    DatabaseModule,

    // MODULE DEMO
    DemoModule,

    // POINT D'ENTREE DE GRAPHQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
