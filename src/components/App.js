import React, { useState } from "react";
import Display from "./Display";
import Button from "./Button";

export default function App() {
  // State for calculator display
  const [display, setDisplay] = useState("");

  // Calculator button content
  const buttonArray = [
    { name: "number", value: "1", class: "button__number" },
    { name: "number", value: "2", class: "button__number" },
    { name: "number", value: "3", class: "button__number" },
    { name: "symbol", value: "/", class: "button__symbol" },
    { name: "number", value: "4", class: "button__number" },
    { name: "number", value: "5", class: "button__number" },
    { name: "number", value: "6", class: "button__number" },
    { name: "symbol", value: "*", class: "button__symbol" },
    { name: "number", value: "7", class: "button__number" },
    { name: "number", value: "8", class: "button__number" },
    { name: "number", value: "9", class: "button__number" },
    { name: "symbol", value: "\u2212", class: "button__symbol" },
    {
      name: "decimal",
      value: ".",
      class: "button__number",
    },
    { name: "zero", value: "0", class: "button__number" },
    { name: "negative", value: "-", class: "button__number" },
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
      class={button.class}
      handleClick={button.name === "equals" ? calculate : updateDisplay}
    />
  ));

  /* Function for onClick of all buttons except "="
Updates display state */
  function updateDisplay(event) {
    const { name, value } = event.target;
    // Get last character of current display string
    const prevInput = display.slice(-1);
    // Split display on symbols and get last group
    const prevNumber = display.split(/[*/+\u2212]/u).slice(-1);
    // Number inputs
    if (name === "number") {
      // Don't allow numbers to start 0[1-9]
      if (prevInput === "0" && prevNumber[0].length === 1) {
        return;
      } else {
        setDisplay((prevDisplay) => prevDisplay + value);
        // Zero input
      }
    } else if (name === "zero") {
      // Allow zero if decimal point is in current number
      if (/[.]/.test(prevNumber)) {
        setDisplay((prevDisplay) => prevDisplay + value);
        // Don't allow numbers to start 00 or -00
      } else if (!display.length || /^-*0+/.test(prevNumber)) {
        return;
      } else {
        setDisplay((prevDisplay) => prevDisplay + value);
      }
    }
    // Symbol inputs
    else if (name === "symbol") {
      // overwrites last input if also a symbol
      if (/[*/+\u2212]/u.test(prevInput)) {
        setDisplay((prevDisplay) => prevDisplay.slice(0, -1) + value);
        // Prevent first input being a symbol or a symbol immediately after decimal
      } else if (!display.length || prevInput === ".") {
        return;
      } else {
        setDisplay((prevDisplay) => prevDisplay + value);
      }
      // Decimal input
    } else if (name === "decimal") {
      // Do not add decimal if last number already contains one
      if (/[.]/.test(prevNumber)) {
        return;
        // If decimal clicked after symbol add 0.
      } else if (!display.length || /[*+-/\u2212]/u.test(prevInput)) {
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
      } else if (!display.length || /[*+\u2212/]/u.test(prevInput)) {
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

  function calculate(event) {
    // const { name, value } = event.target;
    // Get last character of current display string
    const prevInput = display.slice(-1);

    // Split display on symbols and get last group
    // const fullInput = display.split(/[*/+-]/);

    // Check last input is a number and reset calculation if not
    // Also check that a calculation is possible
    if (!/[0-9]/.test(prevInput) || !display.length) {
      setDisplay("Error");
      setTimeout(() => setDisplay(""), 1000);
    }

    // Split display into numbers an operators
    const splitDisplay = display.split(/([+*/\u2212])/u);

    let newDisplay = [splitDisplay[0]];
    // Compute all * and / calculations only
    for (let i = 1; i < splitDisplay.length; i += 2) {
      let firstNumber = newDisplay.pop();
      let operand = splitDisplay[i];
      let secondNumber = splitDisplay[i + 1];

      if (/\*/.test(operand)) {
        let calc = parseFloat(firstNumber) * parseFloat(secondNumber);
        newDisplay.push(calc);
      } else if (/\//.test(operand)) {
        let calc = parseFloat(firstNumber) / parseFloat(secondNumber);
        newDisplay.push(calc);
      } else {
        newDisplay.push(firstNumber, operand, secondNumber);
      }
    }

    // Compute all + and - calculations
    let result = newDisplay[0];

    for (let i = 1; i < newDisplay.length; i += 2) {
      let operand = newDisplay[i];
      let secondNumber = newDisplay[i + 1];
      if (/\+/.test(operand)) {
        let temp = parseFloat(result) + parseFloat(secondNumber);
        result = temp;
      } else {
        let temp = parseFloat(result) - parseFloat(secondNumber);
        result = temp;
      }
    }

    // Check result is a number
    if (typeof result === "number") {
      //round result to 5dp and remove any excess 0s
      let roundResult = parseFloat(result.toFixed(5));

      // Set display to result of calculation
      setDisplay(roundResult.toString());
    }
  }

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
