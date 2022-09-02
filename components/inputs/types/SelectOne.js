import React, { useState, useEffect } from "react";

export default function Number({ input, handleValue }) {
  const [id] = useState(input[0]);
  const [value, setValue] = useState(input[1].value);
  const [required] = useState(input[1].required);
  const [options] = useState(input[1].options);

  useEffect(() => {
    var event = {
      target: {
        name: id,
        value: value,
      },
    };
    handleValue(event);
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <label htmlFor={id}>{id}</label>
      <select
        name={id}
        id={id}
        onChange={(e) => handleChange(e)}
        required={required}
      >
        {!value ? (
          <option disabled>Select one choice </option>
        ) : (
          <option value={value}>{value}</option>
        )}
        {options.map((op, i) => (
          <option key={i} value={op}>
            {op}
          </option>
        ))}
      </select>
      <br></br>
    </>
  );
}
