import React from "react";

export default function Recordinput({ input, setInput }) {
  const handleInputChange = (event) => {
    setInput(event.target.value);
    console.log("Input text:", event.target.value);
  };

  return (
    <textarea
      name="source-text"
      cols="30"
      rows="10"
      value={input}
      onChange={handleInputChange}
      className="input-textarea"
    ></textarea>
  );
}
