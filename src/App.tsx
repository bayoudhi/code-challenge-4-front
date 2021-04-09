import React, {
  FunctionComponent,
  useEffect,
  useReducer,
  useState,
} from "react";

import "./App.css";
import { AddTodo } from "./components/AddTodo";
import { Layout } from "./components/Layout";
import { TodoList } from "./components/TodoList";

import Amplify from "aws-amplify";
import * as API from "./API";
import { reducer } from "./reducer";
import { LinearProgress, Snackbar } from "@material-ui/core";

Amplify.configure(JSON.parse(process.env.REACT_APP_AWS_EXPORTS || ""));

const App: FunctionComponent<{}> = () => {
  const [state, dispatch] = useReducer(reducer, {
    todos: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    // Anything in here is fired on component mount.
    API.getTodos({})
      .then((result) => {
        setLoading(false);
        dispatch({
          type: "SET",
          payload: result?.Items || [],
        });
      })
      .catch((error) => {
        setLoading(false);
        if (error && error.errors && error.errors[0]) {
          setError(error.errors[0].message);
        } else {
          setError("Error happened");
        }
        console.error(error);
      });

    return () => {
      // Anything in here is fired on component unmount.
      // console.log("B");
    };
  }, []);

  const addTodo = async (title: string) => {
    try {
      setLoading(true);
      const response = await API.createTodo({
        title,
      });
      if (response)
        dispatch({
          type: "ADD",
          payload: response,
        });
    } catch (error) {
      if (error && error.errors && error.errors[0]) {
        setError(error.errors[0].message);
      } else {
        setError("Error happened");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    const todo = { ...state.todos[id] };
    try {
      setLoading(true);
      dispatch({
        type: "DELETE",
        payload: {
          id,
        },
      });
      await API.deleteTodo({
        id,
      });
    } catch (error) {
      if (error && error.errors && error.errors[0]) {
        setError(error.errors[0].message);
      } else {
        setError("Error happened");
      }
      console.error(error);
      dispatch({
        type: "ADD",
        payload: todo,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id: string) => {
    const todo = state.todos[id];
    try {
      setLoading(true);
      dispatch({
        type: "UPDATE",
        payload: {
          ...todo,
          completed: !todo?.completed,
        },
      });
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
    } catch (error) {
      if (error && error.errors && error.errors[0]) {
        setError(error.errors[0].message);
      } else {
        setError("Error happened");
      }
      console.error(error);
      dispatch({
        type: "UPDATE",
        payload: todo,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      {loading && <LinearProgress color="secondary" />}
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={error !== ""}
        message={error}
        onClose={() => setError("")}
        autoHideDuration={6000}
      />
    </Layout>
  );
};

export default App;
