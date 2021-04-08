import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import "./App.css";
import { AddTodo } from "./components/AddTodo";
import { Layout } from "./components/Layout";
import { TodoList } from "./components/TodoList";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import awsconfig from "./aws-exports";

import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";
import { GetTodosQuery, Todo } from "./API";

Amplify.configure(awsconfig);

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
      console.log("B");
    };
  }, []);

  return (
    <Layout>
      <AddTodo onAdd={(title) => console.log("onAdd", title)}></AddTodo>
      <TodoList
        onComplete={(id) => console.log("onComplete ", id)}
        onUncomplete={(id) => console.log("onUncomplete ", id)}
        onDelete={(id) => console.log("onDelete ", id)}
        items={todos}
      ></TodoList>
    </Layout>
  );
};

export default App;
