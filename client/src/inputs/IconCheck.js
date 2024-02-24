import React from 'react'

function IconCheck({onChange,input,inputVal}) {

    function handleClick(e){

        e.target.name = e.target.getAttribute("name")

       
        e.target.value = e.target.getAttribute("value") === "false" ? "true" : "false";
        
        onChange(e)
    }

   

  return (
    
     <i value={inputVal} key={input.key} onClick={handleClick} name={input.name}
      className={`icon-check ${inputVal === "true" ? input.onTrue : input.onFalse}`}></i>
   
  )
}

export default IconCheck