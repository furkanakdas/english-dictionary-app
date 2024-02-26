import React, { useEffect } from 'react'

let i = 0;

let array = [0,1,2,3,4,5,6]




function Range({onChange,input,inputVal}) {

  return (
    
    <div key={input.key} className='range'>
    
       <label for={`customRange${++i}`} className="form-label">{input.label}</label>
       <input
        onChange={onChange}
        name={input.name}
        value={inputVal}
        type="range" className="form-range" 
        min="0" max="6" step="1" id={`customRange${++i}`} />
        <div className='scale'>
            {array.map(i => {
              return <div style={{marginLeft:`${i*100/6}%`}}>{Math.pow(10,i)}</div>
            })}
            
        </div>
    </div>
  )
}

export default Range