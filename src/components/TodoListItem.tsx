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
}

export const TodoListItem: FunctionComponent<TodoListItemProps> = ({
  divider,
  title,
  completed,
}) => {
  return (
    <ListItem divider={divider}>
      <Checkbox checked={completed} disableRipple />
      <ListItemText primary={title} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo">
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
