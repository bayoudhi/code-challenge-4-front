import { Todo } from "./APITypes";

type State = { todos: { [key: string]: Todo } };

type Action =
  | { type: "SET"; payload: Todo[] }
  | { type: "ADD"; payload: Todo }
  | { type: "UPDATE"; payload: Todo }
  | { type: "DELETE"; payload: { id: string } };

export function reducer(state: State, action: Action): State {
  if (action.type === "SET") {
    const newTodos: { [key: string]: Todo } = {};
    action.payload?.forEach((item: Todo) => {
      if (item.id) newTodos[item.id] = item;
    });
    return { todos: newTodos };
  }
  if (action.type === "ADD") {
    const todo: Todo = action.payload;
    if (todo.id)
      return {
        todos: {
          ...state.todos,
          [todo.id]: todo,
        },
      };
  }
  if (action.type === "UPDATE") {
    const todo: Todo = action.payload;
    if (todo.id) {
      const existingTodo = state.todos[todo.id];
      if (
        todo &&
        todo.updatedAt &&
        existingTodo &&
        existingTodo.updatedAt &&
        todo.updatedAt >= existingTodo.updatedAt
      ) {
        return {
          todos: {
            ...state.todos,
            [todo.id]: todo,
          },
        };
      }
    }
  }
  if (action.type === "DELETE") {
    const { id } = action.payload;
    const newState = { ...state };
    if (id) {
      delete newState.todos[id];
    }
    return newState;
  }
  return state;
}
