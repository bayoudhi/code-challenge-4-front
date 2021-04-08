import React, { FunctionComponent } from "react";
import { List, Paper } from "@material-ui/core";
import { TodoListItem } from "./TodoListItem";

export interface TodoListProps {
  items: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

export const TodoList: FunctionComponent<TodoListProps> = ({ items }) => {
  return (
    <>
      {items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: "scroll" }}>
            {items.map((todo, index) => (
              <TodoListItem
                {...todo}
                key={todo.id}
                divider={index !== items.length - 1}
              />
            ))}
          </List>
        </Paper>
      )}
    </>
  );
};
