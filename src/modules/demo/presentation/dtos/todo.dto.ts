import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Todo } from '../../domain/entities/todo.entity';

@ObjectType()
export class TodoDto extends Todo {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  completed: boolean;
}
