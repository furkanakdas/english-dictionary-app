import React, { useState } from 'react'
import { KelimeFields } from '../models';


function SearchBox({onSearch,input,inputVal}) {

  const [val,setVal] = useState(inputVal);

  function handleChange(e){
    onSearch({[e.target.name]:e.target.value})
     
    setVal(e.target.value);

  }

  return (
    <form className="d-flex " role="search">
        <input onChange={handleChange} name={input.name} value={val} className="form-control me-2"
         type="search" placeholder="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  )
}

export default SearchBox