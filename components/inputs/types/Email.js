import React, { useEffect, useState } from "react";

export default function Email({ input, handleValue }) {
  const [data, setData] = useState(input);
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
      {data && (
        <>
          <label htmlFor={data[0]}>{data[0]}</label>
          <input
            required={data[1].required}
            name={data[0]}
            id={id}
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            value={value}
            placeholder={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <br></br>
        </>
      )}
    </>
  );
}
