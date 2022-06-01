import React from "react";

export default function Display(props) {
  return (
    <div className="display">
      <span className="display__text">
        {props.display.length ? props.display : "0"}
      </span>
    </div>
  );
}
