import React from "react";
import { Story, Meta } from "@storybook/react";

import { Layout } from "./Layout";
import { AddTodo } from "./AddTodo";

export default {
  title: "Todos/Layout",
  component: Layout,
  argTypes: {},
} as Meta;

const Template: Story<{}> = (args) => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <AddTodo onAdd={(title) => console.log("onAdd", title)}></AddTodo>,
};
