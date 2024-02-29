import React, { useEffect, useState } from 'react'



function SearchBox({onSearch,input,inputVal}) {

  const [val,setVal] = useState(()=>{
    return inputVal
  });


  useEffect(()=>{

    setVal(inputVal)

  },[inputVal])


  function handleChange(e){
     
    setVal(e.target.value);

  }

  useEffect(()=>{
   
    console.log(val);
    onSearch({[input.name]:val})

  },[val,input.name])

 
  return (
    <div className="d-flex search-box" role="search">
        <input 
        
         onChange={handleChange} name={input.name} value={val} className="form-control me-2 box"
         type="search" placeholder="Search"/>
        <button style={{flex:1}} className="btn btn-outline-success" type="submit">Search</button>
    </div>
  )
}

export default SearchBox