import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import Range from '../inputs/Range';
import InputGroup from '../utility/InputGroup';
import Frame from '../utility/Frame';
import { Kelime } from '../models';


let inputs = [
  {key:0,name:"min",type:"range",label:"Min"},
  {key:1,name:"max",type:"range",label:"Max"},
]

let initialInputsVal = {min:"0",max:"1"}
let currInputVal = initialInputsVal;

function Number() {

   let place = useOutletContext();

   const [rangeValues,setRangeValues] = useState(()=>initialInputsVal);

   function handleOk(res){

    let min = window.Number(res.min);
    let max = window.Number(res.max);


      if(min >= max){

        setRangeValues(prev =>{

          if(min - 1 == -1){
            res.max = String(max + 1);
            return res
          }else{
            res.min = String(min - 1)
            return res
          }
        
        })

      }

      currInputVal = res;
      
   }

   function handleBring(){

    let min = Math.pow(10,window.Number(currInputVal.min));
    let max = Math.pow(10,window.Number(currInputVal.max));

    let r = Math.floor(Math.random() * (max - min)) + min;

    r = r.toString()

    return new Kelime(r,"sayi");

   }

   useEffect(()=>{

    place.setPlace(<></>)

   },[])

  return (
    <div className='number'>
      <InputGroup onOk={handleOk} autoOk inputs={inputs} inputsVal={rangeValues} />
      <Frame onBringData={handleBring} />
    </div>
  )
}

export default Number