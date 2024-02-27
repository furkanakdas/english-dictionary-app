import React, { useEffect, useState } from 'react'
import { KelimeFields } from '../models';
import InputGroup from '../utility/InputGroup';


const inputs=[
  {key:"1",type:"input",inputType:"number",min:"1",max:"100",name:"letterNum1",step:"1"},
  {key:"2",type:"input",inputType:"number",min:"1",max:"100",name:"letterNum2",step:"1"},
]

const inputsValue = {letterNum1:"1",letterNum2:"100"}


function SearchBox({onSearch,input,inputVal}) {

  const [val,setVal] = useState(inputVal);


  useEffect(()=>{

    setVal(inputVal)

  },[inputVal])


  function handleChange(e){
     
    setVal(e.target.value);

  }

  useEffect(()=>{
   
    onSearch({[input.name]:val})

  },[val,input.name])

  function handleNumChange(w){

    let num1 = Number(w.letterNum1);
    let num2 = Number(w.letterNum2);

    let max,min;

    if(num1 >= num2){
        max=num1;
        min=num2;
      }else{
        max=num2;
        min=num1;
      }

    let regex = `^[\\w\\W]{${min},${max}}$`

    setVal(regex)

  }

  return (
    <div className="d-flex search-box" role="search">
        <input 
        
         onChange={handleChange} name={input.name} value={val} className="form-control me-2 box"
         type="search" placeholder="Search"/>
        <InputGroup autoOk inputs={inputs} inputsVal={inputsValue} onOk={handleNumChange} />
        {/* <button style={{flex:1}} className="btn btn-outline-success" type="submit">Search</button> */}
    </div>
  )
}

export default SearchBox