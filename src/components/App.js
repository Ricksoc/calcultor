import React, { useState } from "react";
import Display from "./Display";
import Button from "./Button";

export default function App() {
  // State for calculator display
  const [display, setDisplay] = useState("");

  // Calculator button content
  const buttonArray = [
    { name: "number", value: "1" },
    { name: "number", value: "2" },
    { name: "number", value: "3" },
    { name: "symbol", value: "/", class: "button__symbol" },
    { name: "number", value: "4" },
    { name: "number", value: "5" },
    { name: "number", value: "6" },
    { name: "symbol", value: "*", class: "button__symbol" },
    { name: "number", value: "7" },
    { name: "number", value: "8" },
    { name: "number", value: "9" },
    { name: "symbol", value: "-", class: "button__symbol" },
    {
      name: "decimal",
      value: ".",
    },
    { name: "zero", value: "0" },
    { name: "negative", value: "\u2212" },
    { name: "symbol", value: "+", class: "button__symbol" },
    {
      name: "equals",
      value: "=",

      class: "button__symbol button__large",
    },
    {
      name: "clear",
      value: "CLR",
      class: "button__clear button__large",
    },
  ];

  const buttons = buttonArray.map((button, index) => (
    <Button
      key={index}
      name={button.name}
      value={button.value}
      class={button.class && button.class}
      handleClick={updateDisplay}
    />
  ));

  /* Function for onClick of all buttons except "="
Updates display state */
  function updateDisplay(event) {
    const { name, value } = event.target;
    // Get last character of current display string
    const prevInput = display.slice(-1);
    // Split display on symbols and get last group
    const currentDisplay = display.split(/[*/+-]/).slice(-1);
    // Number inputs
    if (name === "number") {
      setDisplay((prevDisplay) => prevDisplay + value);
      // Zero input
    } else if (name === "zero") {
      // Allow zero if decimal point is in current number
      if (/[.]/.test(currentDisplay)) {
        setDisplay((prevDisplay) => prevDisplay + value);
        // Don't allow more than one zero without decimal point
        //or 0 to be entered as the first number input
      } else if (prevInput === "0" || !display.length) {
        return;
      } else {
        setDisplay((prevDisplay) => prevDisplay + value);
      }
    }
    // Symbol inputs
    else if (name === "symbol") {
      // overwrites last input if also a symbol
      if (/[*/+-]/.test(prevInput)) {
        setDisplay((prevDisplay) => prevDisplay.slice(0, -1) + value);
        // Prevent first input being a symbol
      } else if (!display.length) {
        return;
      } else {
        setDisplay((prevDisplay) => prevDisplay + value);
      }
      // Decimal input
    } else if (name === "decimal") {
      // Do not add decimal if last number already contains one
      if (/[.]/.test(currentDisplay)) {
        return;
        // If decimal clicked after symbol add 0.
      } else if (!display.length || /[*+-/\u2212]/.test(prevInput)) {
        setDisplay((prevDisplay) => prevDisplay + `0${value}`);
      } else {
        setDisplay((prevDisplay) => prevDisplay + value);
      }
      // Negative input
    } else if (name === "negative") {
      // Don't place a (-) immideitely after .
      if (/[.]/.test(prevInput)) {
        return;
        // Only start new number with (-)
      } else if (!display.length || /[*+-/]/.test(prevInput)) {
        setDisplay((prevDisplay) => prevDisplay + value);
      } else {
        return;
      }
    } else if (name === "clear") {
      setDisplay("");
    } else {
      console.log("function not yet defined");
    }
  }
  console.log(display);

  return (
    <main>
      <div className="container">
        <Display display={display} />
        <div className="buttons">
          <div className="buttons__small">{buttons}</div>
        </div>
      </div>
    </main>
  );
}
