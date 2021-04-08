/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      title
      completed
      createdAt
      updatedAt
    }
  }
`;
export const getTodos = /* GraphQL */ `
  query GetTodos($limit: Int, $token: String) {
    getTodos(limit: $limit, token: $token) {
      Items {
        id
        title
        completed
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
