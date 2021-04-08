import React from "react";
import { Story, Meta } from "@storybook/react";

import { Layout } from "./Layout";
import { AddTodo } from "./AddTodo";
import { TodoList } from "./TodoList";

export default {
  title: "Todos/Layout",
  component: Layout,
  argTypes: {},
} as Meta;

const Template: Story<{}> = (args) => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <AddTodo onAdd={(title) => console.log("onAdd", title)}></AddTodo>
      <TodoList
        onComplete={(id) => console.log("onComplete ", id)}
        onUncomplete={(id) => console.log("onUncomplete ", id)}
        onDelete={(id) => console.log("onDelete ", id)}
        items={[
          {
            __typename: "Todo",
            id: "id1",
            title: "Go to school",
            completed: false,
          },
          {
            __typename: "Todo",
            id: "id3",
            title: "Buy milk",
            completed: true,
          },
          {
            __typename: "Todo",
            id: "id2",
            title: "Buy PS5",
            completed: false,
          },
        ]}
      ></TodoList>
    </>
  ),
};
