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
  id: "id1",
  title: "Go to cinema",
  completed: false,
  divider: false,
};

export const Completed = Template.bind({});
Completed.args = {
  id: "id1",
  title: "Go to cinema",
  completed: true,
  divider: false,
};

export const WithDivider = Template.bind({});
WithDivider.args = {
  id: "id1",
  title: "Go to cinema",
  completed: true,
  divider: true,
};

export const WithoutDivider = Template.bind({});
WithoutDivider.args = {
  id: "id1",
  title: "Go to cinema",
  completed: true,
  divider: false,
};
