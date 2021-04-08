import React, { FunctionComponent } from "react";
import { List, Paper } from "@material-ui/core";
import { TodoListItem } from "./TodoListItem";
import { Todo } from "../APITypes";

export interface TodoListProps {
  items: Todo[];
  onComplete?: (id: string) => void;
  onUncomplete?: (id: string) => void;
  onDelete?: (title: string) => void;
}

export const TodoList: FunctionComponent<TodoListProps> = ({
  items,
  onComplete,
  onUncomplete,
  onDelete,
}) => {
  return (
    <>
      {items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: "scroll" }}>
            {items.map((todo, index) => (
              <TodoListItem
                todo={todo}
                onComplete={onComplete}
                onUncomplete={onUncomplete}
                onDelete={onDelete}
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
