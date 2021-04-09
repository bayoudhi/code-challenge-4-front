import AmplifyAPI, { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import {
  CreateTodoMutation,
  CreateTodoMutationVariables,
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
  GetTodosQuery,
  GetTodosQueryVariables,
  OnCreateTodoSubscription,
  OnDeleteTodoSubscription,
  OnUpdateTodoSubscription,
  Todo,
  Todos,
  UpdateTodoMutation,
  UpdateTodoMutationVariables,
} from "./APITypes";

import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";
import Observable from "zen-observable";

export const getTodos = async (
  variables: GetTodosQueryVariables
): Promise<Todos | null | undefined> => {
  const result = await (AmplifyAPI.graphql(
    graphqlOperation(queries.getTodos, variables)
  ) as Promise<GraphQLResult<GetTodosQuery>>);
  return result.data?.getTodos;
};

export const createTodo = async (
  variables: CreateTodoMutationVariables
): Promise<Todo | null | undefined> => {
  const result = await (AmplifyAPI.graphql(
    graphqlOperation(mutations.createTodo, variables)
  ) as Promise<GraphQLResult<CreateTodoMutation>>);
  return result.data?.createTodo;
};

export const deleteTodo = async (
  variables: DeleteTodoMutationVariables
): Promise<Todo | null | undefined> => {
  const result = await (AmplifyAPI.graphql(
    graphqlOperation(mutations.deleteTodo, variables)
  ) as Promise<GraphQLResult<DeleteTodoMutation>>);
  return result.data?.deleteTodo;
};

export const updateTodo = async (
  variables: UpdateTodoMutationVariables
): Promise<Todo | null | undefined> => {
  const result = await (AmplifyAPI.graphql(
    graphqlOperation(mutations.updateTodo, variables)
  ) as Promise<GraphQLResult<UpdateTodoMutation>>);
  return result.data?.updateTodo;
};

export const onCreateTodo = () =>
  (AmplifyAPI.graphql(
    graphqlOperation(subscriptions.onCreateTodo)
  ) as unknown) as Observable<{
    value: GraphQLResult<OnCreateTodoSubscription>;
  }>;

export const onUpdateTodo = () =>
  (AmplifyAPI.graphql(
    graphqlOperation(subscriptions.onUpdateTodo)
  ) as unknown) as Observable<{
    value: GraphQLResult<OnUpdateTodoSubscription>;
  }>;

export const onDeleteTodo = () =>
  (AmplifyAPI.graphql(
    graphqlOperation(subscriptions.onDeleteTodo)
  ) as unknown) as Observable<{
    value: GraphQLResult<OnDeleteTodoSubscription>;
  }>;
