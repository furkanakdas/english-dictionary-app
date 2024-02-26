import React from 'react'

function Input({onChange, input, inputVal}) {


  return (
    <div key={input.key} className={`${input.parentClass ? input.parentClass : "input-group "}`}>
    <span style={{flex:0.2}} className="input-group-text" >
      {input.label}
    </span>
    <input
            
            value={inputVal}
            onChange={onChange}
            key={input.key}
            style={{flex:0.8}}
            type={input.inputType}
            name={input.name}
            className={`${input.class ? input.class : " form-control"}`}
            step="0.1"
          />
    </div>

  )
}

export default Input