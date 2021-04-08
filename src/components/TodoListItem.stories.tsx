import React from "react";
import { Story, Meta } from "@storybook/react";

import { Layout } from "./Layout";
import { TodoListItem, TodoListItemProps } from "./TodoListItem";

export default {
  title: "Todos/TodoListItem",
  component: Layout,
  argTypes: {},
} as Meta;

const Template: Story<TodoListItemProps> = (args) => <TodoListItem {...args} />;

export const Uncompleted = Template.bind({});
Uncompleted.args = {
  todo: {
    __typename: "Todo",
    id: "id1",
    title: "Go to cinema",
    completed: false,
  },
  divider: false,
  onComplete: () => console.log("onComplete"),
  onUncomplete: () => console.log("onUncomplete"),
  onDelete: (id) => console.log("onDelete ", id),
};

export const Completed = Template.bind({});
Completed.args = {
  todo: {
    __typename: "Todo",
    id: "id1",
    title: "Go to cinema",
    completed: true,
  },
  divider: false,
  onComplete: () => console.log("onComplete"),
  onUncomplete: () => console.log("onUncomplete"),
  onDelete: (id) => console.log("onDelete ", id),
};

export const WithDivider = Template.bind({});
WithDivider.args = {
  todo: {
    __typename: "Todo",
    id: "id1",
    title: "Go to cinema",
    completed: true,
  },
  divider: true,
  onComplete: () => console.log("onComplete"),
  onUncomplete: () => console.log("onUncomplete"),
  onDelete: (id) => console.log("onDelete ", id),
};

export const WithoutDivider = Template.bind({});
WithoutDivider.args = {
  todo: {
    __typename: "Todo",
    id: "id1",
    title: "Go to cinema",
    completed: true,
  },
  divider: false,
  onComplete: () => console.log("onComplete"),
  onUncomplete: () => console.log("onUncomplete"),
  onDelete: (id) => console.log("onDelete ", id),
};
