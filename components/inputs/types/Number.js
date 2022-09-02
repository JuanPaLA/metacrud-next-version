import React, { useState, useEffect } from "react";

export default function Number({ input, handleValue }) {
  const [id, setId] = useState(input[0]);
  const [value, setValue] = useState(input[1].value);
  const [required, setRequired] = useState(input[1].required);

  useEffect(() => {
    var event = {
      target: {
        name: id,
        value: value,
      },
    };
    handleValue(event);
  }, [value]);

  return (
    <>
      <label htmlFor={id}>{id}</label>
      <input
        name={id}
        id={id}
        type="number"
        value={value}        
        placeholder={value}
        required={required}
        onChange={(e) => setValue(e.target.value)}
      />
      <br></br>
    </>
  );
}
