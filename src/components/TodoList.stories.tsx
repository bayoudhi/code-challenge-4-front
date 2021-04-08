import React from "react";
import { Story, Meta } from "@storybook/react";

import { Layout } from "./Layout";
import { TodoList, TodoListProps } from "./TodoList";

export default {
  title: "Todos/TodoList",
  component: Layout,
  argTypes: {},
} as Meta;

const Template: Story<TodoListProps> = (args) => <TodoList {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      id: "id1",
      title: "Go to school",
      completed: false,
    },
    {
      id: "id3",
      title: "Buy milk",
      completed: true,
    },
    {
      id: "id2",
      title: "Buy PS5",
      completed: false,
    },
  ],
};

export const EmptyList = Template.bind({});
EmptyList.args = {
  items: [],
};
