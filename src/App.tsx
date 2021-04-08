import React from "react";

import "./App.css";
import { AddTodo } from "./components/AddTodo";
import { Layout } from "./components/Layout";
import { TodoList } from "./components/TodoList";

import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  return (
    <Layout>
      <AddTodo onAdd={(title) => console.log("onAdd", title)}></AddTodo>
      <TodoList
        onComplete={(id) => console.log("onComplete ", id)}
        onUncomplete={(id) => console.log("onUncomplete ", id)}
        onDelete={(id) => console.log("onDelete ", id)}
        items={[
          {
            id: "id1",
            title: "Go to school",
            completed: false,
          },
          {
            id: "id3",
            title: "Buy milk",
            completed: true,
          },
          {
            id: "id2",
            title: "Buy PS5",
            completed: false,
          },
        ]}
      ></TodoList>
    </Layout>
  );
}

export default App;
