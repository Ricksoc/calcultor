import React from "react";

export default function Button(props) {
  return (
    <button
      className={
        props.class ? `button__number ${props.class}` : "button__number"
      }
      name={props.name}
      value={props.value}
      onClick={(event) => props.handleClick(event)}
    >
      {props.value}
    </button>
  );
}
