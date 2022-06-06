import React from "react";

export default function Button(props) {
  return (
    <button
      className={`button ${props.class}`}
      name={props.name}
      value={props.value}
      onClick={(event) => props.handleClick(event)}
    >
      {props.value}
    </button>
  );
}
