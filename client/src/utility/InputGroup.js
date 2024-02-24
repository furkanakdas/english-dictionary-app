import React, { useEffect, useState } from "react";
import Radio from "../inputs/Radio";
import Check from "../inputs/Check";
import Select from "../inputs/Select";
import Input from "../inputs/Input";
import IconCheck from "../inputs/IconCheck";
import Range from "../inputs/Range";

function InputGroup({inputs,inputsVal,onOk=()=>{},resetOnOk = false,autoOk=false}) {


    const [cInputsVal,setCInputsVal] = useState(()=>{
    
        return {...inputsVal}

    })


    useEffect(()=>{
      setCInputsVal({...inputsVal})

    },[inputsVal])

    useEffect(()=>{


      if(autoOk){

        let res = {};

        res = {...cInputsVal}
        
        onOk(res);

      }

    },[cInputsVal])
    
    function handleChange(e){


        setCInputsVal(prev =>  {

            prev[e.target.name] = e.target.value;

            return {...prev}
            }
        )
    
    }
    
    return (
    <div className={"input-group "} >
    
    
        {inputs && inputs.map(input =>{
          
           if(input.type === "select"){
              return (
                <Select onChange={handleChange} input={input} inputVal={cInputsVal[input.name]} />
              );
           }
          
          if(input.type === "input"){
            return <Input onChange={handleChange} input={input} inputVal={cInputsVal[input.name]}  />
          } 
          
          if(input.type === "radio"){
           return <Radio onChange={handleChange} input={input} inputVal={cInputsVal[input.name]} />          

          } 
           
          if(input.type === "check"){
           return <Check onChange={handleChange} input={input} inputVal={cInputsVal[input.name]} />          
          }

          if(input.type === "iconCheck"){
           return <IconCheck onChange={handleChange} input={input} inputVal={cInputsVal[input.name]} />          
          }

          if(input.type === "range"){
           return <Range onChange={handleChange} input={input} inputVal={cInputsVal[input.name]} />          
          }
           
           return <div>No Input Found</div>
           
        })}
    
    
    {!autoOk && <div onClick={()=>{

        let res = {};

        res = {...cInputsVal}

        onOk(res);

        if(resetOnOk)
            setCInputsVal((prev)=>{return {...inputsVal}})

    }} style={{width:"75%"}} className="btn btn-primary mt-3">Press</div>}
    
  
    </div>
    );
}

export default InputGroup;
















