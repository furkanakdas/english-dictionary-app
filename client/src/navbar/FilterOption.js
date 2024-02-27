import React, { useState } from 'react'
import Modal from '../utility/Modal'
import InputGroup from '../utility/InputGroup'
import {  FilterFields, FilterWordLevels, FilterWordTypes} from '../models'


let inputs = [
    {key:"1",type:"select",name:FilterFields.Type,label:"Filter By Type",
    options:Object.keys(FilterWordTypes).map((key)=>{return {value:FilterWordTypes[key],text:key}})  
    },
    {key:"2",type:"select",name:FilterFields.Level,label:"Filter By Level",
    options:Object.keys(FilterWordLevels).map((key)=>{return {value:FilterWordLevels[key],text:key}})  },
   ]


function FilterOption({onOk,options}) {

  const [active,setActive] = useState(()=>{
    if(Object.keys(options).length == 0)
      return false;
    else
      return true;
  });


  

  return (
    <Modal
         id={"modalFilterOptions"}
         title='Filter' 
         body={<InputGroup autoOk={true} inputsVal={options} 
         inputs={inputs}
          onOk={(_filterOptions)=>{


          let toBeDeletedKeys = Object.keys(_filterOptions).filter(key => _filterOptions[key] == FilterWordLevels.All);

          toBeDeletedKeys.forEach(key => {delete _filterOptions[key]})
 
            setActive((prev)=>{
              if(Object.keys(_filterOptions).length == 0)
                return false;
              else
                return true
            })


            onOk(_filterOptions)
            
            }}  />}
         trigger={
          <li style={{marginLeft:"20px"}} className='nav-item point'>
            <i style={{fontSize:"19px"}} className={`bi bi-funnel-fill nav-link ${active && "active"}`}></i>
         </li>
         }

          />
  )
}

export default FilterOption