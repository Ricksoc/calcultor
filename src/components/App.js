import React from "react";
import { nanoid } from "nanoid";

import Display from "./Display";
import Button from "./Button";

export default function App() {
  // Calculator button content
  const buttonArray = [
    { name: "one", value: "1", id: nanoid() },
    { name: "two", value: "2", id: nanoid() },
    { name: "three", value: "3", id: nanoid() },
    { name: "divide", value: "/", id: nanoid(), class: "button__symbol" },
    { name: "four", value: "4", id: nanoid() },
    { name: "five", value: "5", id: nanoid() },
    { name: "six", value: "6", id: nanoid() },
    { name: "multiply", value: "*", id: nanoid(), class: "button__symbol" },
    { name: "seven", value: "7", id: nanoid() },
    { name: "eight", value: "8", id: nanoid() },
    { name: "nine", value: "9", id: nanoid() },
    { name: "subtract", value: "-", id: nanoid(), class: "button__symbol" },
    { name: "decimal", value: ".", id: nanoid() },
    { name: "zero", value: "0", id: nanoid() },
    { name: "negative", value: "(-)", id: nanoid() },
    { name: "add", value: "+", id: nanoid(), class: "button__symbol" },
    {
      name: "equals",
      value: "=",
      id: nanoid(),
      class: "button__symbol button__large",
    },
    {
      name: "clear",
      value: "CLR",
      id: nanoid(),
      class: "button__clear button__large",
    },
  ];

  const buttons = buttonArray.map((button) => (
    <Button
      name={button.name}
      value={button.value}
      class={button.class && button.class}
    />
  ));

  return (
    <main>
      <div className="container">
        <Display />
        <div className="buttons">
          <div className="buttons__small">{buttons}</div>
        </div>
      </div>
    </main>
  );
}
