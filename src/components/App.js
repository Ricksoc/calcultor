import React from "react";
import { nanoid } from "nanoid";

import Display from "./Display";
import Button from "./Button";

export default function App() {
  const idArray = Array.from({ length: 18 }, () => nanoid());
  console.log(idArray);

  return (
    <main>
      <div className="container">
        <Display />
        <div className="buttons">
          <div className="buttons__small">
            <Button />
            <Button />
            <Button />
            <Button class="button__symbol" />
            <Button />
            <Button />
            <Button />
            <Button class="button__symbol" />
            <Button />
            <Button />
            <Button />
            <Button class="button__symbol" />
            <Button />
            <Button />
            <Button />
            <Button class="button__symbol" />
            <Button class="button__symbol button__large" />
            <Button class="button__clear button__large" />
          </div>
        </div>
      </div>
    </main>
  );
}
