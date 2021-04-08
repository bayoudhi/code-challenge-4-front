import React, { FunctionComponent, useState } from "react";
import { Button, Input } from "@material-ui/core";

export interface AddTodoProps {
  onAdd: (title: string) => void;
}

export const AddTodo: FunctionComponent<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  return (
    <aside>
      <Input
        id="new-todo"
        value={title}
        placeholder="Add new todo"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        disabled={title === ""}
        color="primary"
        variant="contained"
        size="small"
        onClick={() => {
          onAdd(title);
          setTitle("");
        }}
      >
        Add
      </Button>
    </aside>
  );
};
