// create-todo.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { CreateTodoEntity } from '../../data/dtos/create-todo.dto';

@InputType()
export class CreateTodoInput extends CreateTodoEntity {
  @Field()
  title: string;
}
