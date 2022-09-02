import { useEffect, useState } from "react";

export default function Textarea({input, handleValue}) {
  const [id, setId] = useState(input[0]);
  const [value, setValue] = useState(input[1].value);
  const [required, setRequired] = useState(input[1].required);

  useEffect(()=>{
    var event = {
      target : {
        name: id,
        value: value
      }
    }
    handleValue(event)
  },[value])

  return (
    <>
        <label htmlFor={id}>{id}</label>
        <br></br>
        <textarea 
            required={required}
            name={id} 
            id={id} 
            rows="2" 
            cols="30"
            placeholder={value}
            value={value}
            onChange={(e)=>setValue(e.target.value)}>
        </textarea>
        <br></br>
    </>
  )
}