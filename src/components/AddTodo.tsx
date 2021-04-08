import React, { FunctionComponent, useState } from "react";
import { Button, Grid, Paper, TextField } from "@material-ui/core";

export interface AddTodoProps {
  onAdd: (title: string) => void;
}

export const AddTodo: FunctionComponent<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            fullWidth
            color="primary"
            placeholder="Add new todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => {
              if (title && e.key === "Enter") {
                onAdd(title);
                setTitle("");
              }
            }}
          />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            disabled={title === ""}
            onClick={() => {
              onAdd(title);
              setTitle("");
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
