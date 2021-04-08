import React, { FunctionComponent } from "react";
import {
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

export interface TodoListItemProps {
  id: string;
  title: string;
  completed: boolean;
  divider: boolean;
  onComplete?: (id: string) => void;
  onUncomplete?: (id: string) => void;
  onDelete?: (title: string) => void;
}

export const TodoListItem: FunctionComponent<TodoListItemProps> = ({
  id,
  divider,
  title,
  completed,
  onComplete,
  onUncomplete,
  onDelete,
}) => {
  return (
    <ListItem divider={divider}>
      <Checkbox
        checked={completed}
        disableRipple
        onClick={() => {
          if (completed) {
            if (onUncomplete) onUncomplete(id);
          } else {
            if (onComplete) onComplete(id);
          }
        }}
      />
      <ListItemText primary={title} />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Delete Todo"
          onClick={() => {
            if (onDelete) onDelete(id);
          }}
        >
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
