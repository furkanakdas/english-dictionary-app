import React from 'react'

function Input({onChange, input, inputVal}) {


  return (
    <div key={input.key} className={"input-group"}>
    {input.label && <span style={{flex:0.2}} className="input-group-text" >
      {input.label}
    </span>}
    <input
            
            value={inputVal}
            onChange={onChange}
            key={input.key}
            style={input.label ? {flex:0.8} :{flex:1} }
            type={input.inputType}
            name={input.name}
            className={`${input.class ? input.class : " form-control"}`}
            step={input.step ? input.step : "0.1"}
            min={input.step ? input.step :  "0"}
            max={input.max ? input.max :  "999"}
          />
    </div>

  )
}

export default Input