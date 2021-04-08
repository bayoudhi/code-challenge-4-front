import React, { FunctionComponent } from "react";
import { List, Paper } from "@material-ui/core";
import { TodoListItem, TodoListItemProps } from "./TodoListItem";

export interface TodoListProps {
  items: {
    id: string;
    title: string;
    completed: boolean;
  }[];
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
                {...todo}
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
