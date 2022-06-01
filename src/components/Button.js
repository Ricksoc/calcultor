import React from "react";

export default function Button(props) {
  return (
    <button
      className={
        props.class ? `button__number ${props.class}` : "button__number"
      }
    >{props.value}</button>
  );
}
