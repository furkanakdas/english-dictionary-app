import React, { useEffect, useState } from 'react'
import { KelimeFields } from '../models';


function SearchBox({onSearch,input,inputVal}) {

  const [val,setVal] = useState(inputVal);
  const [numVal,setNumVal] = useState();


  function handleChange(e){
     
    setVal(e.target.value);

  }

  useEffect(()=>{

    onSearch({[input.name]:val})

  },[val,input.name])

  function handleNumChange(e){

    let no = e.target.value;

    let regex = `^[\\w\\W]{${no}}$`

    setVal(regex)
    setNumVal(no)

  }

  return (
    <div className="d-flex " role="search">
        <input style={{flex:10}}
         onChange={handleChange} name={input.name} value={val} className="form-control me-2"
         type="search" placeholder="Search"/>
         <input value={numVal} onChange={handleNumChange} style={{width:"60px"}} type='number' min={"0"} step={"1"}  />
        {/* <button style={{flex:1}} className="btn btn-outline-success" type="submit">Search</button> */}
    </div>
  )
}

export default SearchBox