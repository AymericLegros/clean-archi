// update-todo.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { UpdateTodoEntity } from '../../data/dtos/update-todo.dto';

@InputType()
export class UpdateTodoInput extends UpdateTodoEntity {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  completed?: boolean;
}
