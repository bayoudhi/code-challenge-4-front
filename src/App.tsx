import React, { FunctionComponent, useEffect, useReducer } from "react";

import "./App.css";
import { AddTodo } from "./components/AddTodo";
import { Layout } from "./components/Layout";
import { TodoList } from "./components/TodoList";

import Amplify from "aws-amplify";
import * as API from "./API";
import { reducer } from "./reducer";

Amplify.configure(JSON.parse(process.env.REACT_APP_AWS_EXPORTS || ""));

const App: FunctionComponent<{}> = () => {
  const [state, dispatch] = useReducer(reducer, {
    todos: {},
  });
  useEffect(() => {
    // Anything in here is fired on component mount.
    API.getTodos({}).then((result) => {
      dispatch({
        type: "SET",
        payload: result?.Items || [],
      });
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
    if (response)
      dispatch({
        type: "ADD",
        payload: response,
      });
  };

  const deleteTodo = async (id: string) => {
    await API.deleteTodo({
      id,
    });
    dispatch({
      type: "DELETE",
      payload: {
        id,
      },
    });
  };

  const updateTodo = async (id: string) => {
    const todo = state.todos[id];
    const response = await API.updateTodo({
      id,
      todo: {
        completed: !todo?.completed,
        title: todo?.title || "",
      },
    });
    if (response)
      dispatch({
        type: "UPDATE",
        payload: response,
      });
  };

  return (
    <Layout>
      <AddTodo onAdd={addTodo}></AddTodo>
      <TodoList
        onComplete={updateTodo}
        onUncomplete={updateTodo}
        onDelete={deleteTodo}
        items={Object.keys(state.todos)
          .map((key) => state.todos[key])
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
