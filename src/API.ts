import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import {
  CreateTodoMutation,
  CreateTodoMutationVariables,
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
  GetTodosQuery,
  GetTodosQueryVariables,
  Todo,
  Todos,
  UpdateTodoMutation,
  UpdateTodoMutationVariables,
} from "./APITypes";

import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";

export const getTodos = async (
  variables: GetTodosQueryVariables
): Promise<Todos | null | undefined> => {
  const result = await (API.graphql(
    graphqlOperation(queries.getTodos, variables)
  ) as Promise<GraphQLResult<GetTodosQuery>>);
  return result.data?.getTodos;
};

export const createTodo = async (
  variables: CreateTodoMutationVariables
): Promise<Todo | null | undefined> => {
  const result = await (API.graphql(
    graphqlOperation(mutations.createTodo, variables)
  ) as Promise<GraphQLResult<CreateTodoMutation>>);
  return result.data?.createTodo;
};

export const deleteTodo = async (
  variables: DeleteTodoMutationVariables
): Promise<Todo | null | undefined> => {
  const result = await (API.graphql(
    graphqlOperation(mutations.deleteTodo, variables)
  ) as Promise<GraphQLResult<DeleteTodoMutation>>);
  return result.data?.deleteTodo;
};

export const updateTodo = async (
  variables: UpdateTodoMutationVariables
): Promise<Todo | null | undefined> => {
  const result = await (API.graphql(
    graphqlOperation(mutations.updateTodo, variables)
  ) as Promise<GraphQLResult<UpdateTodoMutation>>);
  return result.data?.updateTodo;
};
