import React from 'react'

function Select({onChange, input, inputVal}) {


  return (
    <div  key={input.key} className={"input-group"}>
    {input.label && <span style={{flex:0.2}} className="input-group-text" >
      {input.label}
    </span>}
    <select onChange={onChange} value={inputVal}  style={input.label ? {flex:0.8} :{flex:1} } className="form-control" name={input.name}>
            
            {input.options.map(option => (
            <option  
            value={option.value}>{option.text}
            </option>))}
          </select>
    </div>

  )
}

export default Select