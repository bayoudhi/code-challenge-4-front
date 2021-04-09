import React, { FunctionComponent } from "react";
import {
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import { Todo } from "../APITypes";

export interface TodoListItemProps {
  todo: Todo;
  divider: boolean;
  onComplete?: (id: string) => void;
  onUncomplete?: (id: string) => void;
  onDelete?: (title: string) => void;
}

export const TodoListItem: FunctionComponent<TodoListItemProps> = ({
  todo,
  divider,
  onComplete,
  onUncomplete,
  onDelete,
}) => {
  return (
    <ListItem divider={divider}>
      <Checkbox
        checked={todo.completed}
        disableRipple
        onClick={() => {
          if (todo.id) {
            if (todo.completed) {
              if (onUncomplete) onUncomplete(todo.id);
            } else {
              if (onComplete) onComplete(todo.id);
            }
          }
        }}
      />
      <ListItemText
        style={{
          textDecoration: todo.completed ? "line-through" : "",
        }}
        primary={todo.title}
      />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Delete Todo"
          onClick={() => {
            if (onDelete && todo.id) onDelete(todo.id);
          }}
        >
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
