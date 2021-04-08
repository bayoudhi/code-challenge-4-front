/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Todo = {
  __typename: "Todo",
  id?: string,
  title?: string,
  completed?: boolean,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateTodoInput = {
  title: string,
  completed: boolean,
};

export type Todos = {
  __typename: "Todos",
  Items?:  Array<Todo >,
  nextToken?: string | null,
};

export type CreateTodoMutationVariables = {
  title?: string,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id: string,
    title: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTodoMutationVariables = {
  id?: string,
  todo?: UpdateTodoInput,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id: string,
    title: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTodoMutationVariables = {
  id?: string,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id: string,
    title: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTodoQueryVariables = {
  id?: string,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    id: string,
    title: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTodosQueryVariables = {
  limit?: number | null,
  token?: string | null,
};

export type GetTodosQuery = {
  getTodos?:  {
    __typename: "Todos",
    Items:  Array< {
      __typename: "Todo",
      id: string,
      title: string,
      completed: boolean,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo?:  {
    __typename: "Todo",
    id: string,
    title: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?:  {
    __typename: "Todo",
    id: string,
    title: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?:  {
    __typename: "Todo",
    id: string,
    title: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};
