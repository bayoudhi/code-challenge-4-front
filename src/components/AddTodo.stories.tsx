import React from "react";
import { Story, Meta } from "@storybook/react";

import { AddTodo, AddTodoProps } from "./AddTodo";

export default {
  title: "Todos/AddTodo",
  component: AddTodo,
  argTypes: {},
} as Meta;

const Template: Story<AddTodoProps> = (args) => <AddTodo {...args} />;

export const Default = Template.bind({});
Default.args = {};
