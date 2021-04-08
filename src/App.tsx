import React, { FunctionComponent, useEffect, useState } from "react";

import "./App.css";
import { AddTodo } from "./components/AddTodo";
import { Layout } from "./components/Layout";
import { TodoList } from "./components/TodoList";

import Amplify, { API as AmplifyAPI } from "aws-amplify";
import { Todo } from "./APITypes";
import * as API from "./API";

Amplify.configure(JSON.parse(process.env.REACT_APP_AWS_EXPORTS || ""));

const App: FunctionComponent<{}> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Anything in here is fired on component mount.
    API.getTodos({}).then((result) => {
      setTodos(result?.Items || []);
    });

    return () => {
      // Anything in here is fired on component unmount.
      // console.log("B");
    };
  }, []);

  const addTodo = async (title: string) => {
    const response = await API.createTodo({
      title,
    });
    if (response) setTodos([...todos, response]);
  };

  const deleteTodo = async (id: string) => {
    const response = await API.deleteTodo({
      id,
    });
    setTodos(todos.filter((todo) => todo.id !== response?.id));
  };

  const updateTodo = async (id: string) => {
    const todo = todos.find((item) => item.id === id);
    const response = await API.updateTodo({
      id,
      todo: {
        completed: !todo?.completed,
        title: todo?.title || "",
      },
    });
    if (response)
      setTodos(
        todos.map((item) => {
          if (item.id === id) {
            return response;
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
