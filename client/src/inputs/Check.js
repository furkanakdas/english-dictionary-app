import React, { useEffect } from "react";

let i=0;

function Check({ onChange, input, inputVal }) {

  

    function handleChange(e){

        

        let value = e.target.value === "false" ? "true" : "false";

        e.target.value = value;

        onChange(e)
    }

  return (
    <>
     
      <div  className="form-check">
      
      <input
        style={{border:"1px solid",borderColor:"gray"}}
        className="form-check-input"
        type="checkbox"
        id={`flexCheckDefault${++i}`}
        value={inputVal}
        name={input.name}
        
        checked={inputVal === "false" ? false : true}
        onChange={handleChange}
      />
      <label className="form-check-label fw-bold" for={`flexCheckDefault${++i}`}>
        {input.label}
      </label>
      </div>



  </>
  );
}

export default Check;

