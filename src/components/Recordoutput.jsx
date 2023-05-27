import React from "react";

export default function Recordoutput({ outputText }) {
  return (
    <textarea
      name="output-text"
      cols="30"
      rows="10"
      value={outputText}
      readOnly
      className="output-textarea"
    ></textarea>
  );
}
