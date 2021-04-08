import React, { FunctionComponent, useEffect, useState } from "react";

import "./App.css";
import { AddTodo } from "./components/AddTodo";
import { Layout } from "./components/Layout";
import { TodoList } from "./components/TodoList";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";

import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
// import * as subscriptions from "./graphql/subscriptions";
import {
  CreateTodoMutation,
  DeleteTodoMutation,
  GetTodosQuery,
  Todo,
  UpdateTodoMutation,
  UpdateTodoMutationVariables,
} from "./API";

Amplify.configure(JSON.parse(process.env.REACT_APP_AWS_EXPORTS || ""));

const App: FunctionComponent<{}> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Anything in here is fired on component mount.
    (API.graphql(graphqlOperation(queries.getTodos)) as Promise<
      GraphQLResult<GetTodosQuery>
    >)
      .then((result) => {
        setTodos(result.data?.getTodos?.Items || []);
      })
      .catch((error) => console.error(error));
    return () => {
      // Anything in here is fired on component unmount.
      // console.log("B");
    };
  }, []);

  const addTodo = async (title: string) => {
    const response = await (API.graphql(
      graphqlOperation(mutations.createTodo, {
        title,
      })
    ) as GraphQLResult<CreateTodoMutation>);

    setTodos([...todos, response.data?.createTodo as Todo]);
  };

  const deleteTodo = async (id: string) => {
    const response = await (API.graphql(
      graphqlOperation(mutations.deleteTodo, {
        id,
      })
    ) as GraphQLResult<DeleteTodoMutation>);
    setTodos(todos.filter((todo) => todo.id !== response.data?.deleteTodo?.id));
  };

  const updateTodo = async (id: string) => {
    const todo = todos.find((item) => item.id === id);
    const response = await (API.graphql(
      graphqlOperation(mutations.updateTodo, {
        id,
        todo: {
          completed: !todo?.completed,
          title: todo?.title,
        },
      } as UpdateTodoMutationVariables)
    ) as GraphQLResult<UpdateTodoMutation>);
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return response.data?.updateTodo as Todo;
        } else {
          return item;
        }
      })
    );
  };

  return (
    <Layout>
      <AddTodo onAdd={addTodo}></AddTodo>
      <TodoList
        onComplete={updateTodo}
        onUncomplete={updateTodo}
        onDelete={deleteTodo}
        items={todos}
      ></TodoList>
    </Layout>
  );
};

export default App;
