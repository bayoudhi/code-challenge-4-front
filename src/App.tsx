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
  const [todos, setTodos] = useState<{ [key: string]: Todo }>({});

  useEffect(() => {
    // Anything in here is fired on component mount.
    API.getTodos({}).then((result) => {
      const newTodos: { [key: string]: Todo } = {};
      result?.Items?.forEach((item) => {
        if (item.id) newTodos[item.id] = item;
      });
      setTodos(newTodos);
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
    if (response && response.id)
      setTodos({ ...todos, [response.id]: response });
  };

  const deleteTodo = async (id: string) => {
    await API.deleteTodo({
      id,
    });
    const newTodos = { ...todos };
    delete newTodos[id];
    setTodos(newTodos);
  };

  const updateTodo = async (id: string) => {
    const todo = todos[id];
    const response = await API.updateTodo({
      id,
      todo: {
        completed: !todo?.completed,
        title: todo?.title || "",
      },
    });
    if (response && response.id)
      setTodos({
        ...todos,
        [response.id]: response,
      });
  };

  return (
    <Layout>
      <AddTodo onAdd={addTodo}></AddTodo>
      <TodoList
        onComplete={updateTodo}
        onUncomplete={updateTodo}
        onDelete={deleteTodo}
        items={Object.keys(todos)
          .map((key) => todos[key])
          .sort((a, b) => {
            if (a.createdAt && b.createdAt) {
              if (a.createdAt < b.createdAt) {
                return 1;
              }
              if (a.createdAt > b.createdAt) {
                return -1;
              }
            }
            return 0;
          })}
      ></TodoList>
    </Layout>
  );
};

export default App;
