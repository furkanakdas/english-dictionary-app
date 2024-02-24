import React, { useEffect, useState } from "react";


let i =0;

function Radio({ onChange, input, inputVal }) {
  //   const [selectedOption, setSelectedOption] = useState("option1");

  const handleOptionChange = (event) => {
    onChange(event);
  };



  return (
    <>
      {input.options.map((option) => (
        <div class="form-check">
          <input
            className="form-check-input"
            type="radio"
            id={`flexRadioDefault${++i}`}
            value={option.value}
            name={input.name}
            checked={inputVal === option.value}
            onChange={handleOptionChange}
          />
          <label
            style={{ color: "white" }}
            class="form-check-label"
            for={`flexRadioDefault${++i}`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
}

export default Radio;
