import React, { useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import InputGroup from './InputGroup';
import { setText, speak, setSpeakRepeatedly, speakRepeatedly, unsetSpeakRepeatedly } from '../speaker';
import { Kelime, VoiceFields } from '../models';

const mouseDownEvent = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: true,
    clientX: 1,
    clientY: 1
  });
  
  const mouseUpEvent = new MouseEvent('mouseup', {
    bubbles: true,
    cancelable: true,
    clientX: 1,
    clientY: 1
  });
  
  let inputs = [
    {key:1,type:"check",name:"hide",label:"Hide"},
    {key:2,type:"check",name:"spelling",label:"Spelling"}
  ]
  
let inputsVal = {hide:"false",spelling:"false"}


let fun;

let timeOut;

let space;

let clicker = "user"

function Frame({onBringData}) {


    let outletContext = useOutletContext();

    const [play,setPlay] = useState(false);
    const [checksRes,setChecksRes] = useState(inputsVal);
    const [i,setI] = useState(0);

    const [broughtData,setBroughtData] = useState(new Kelime("hf","bitti"));


    let ref = useRef(null)

    function handleButtonClick(e){
        setPlay(prev => !prev)
    }

      async function handleBringClick(){
    
        let d =await onBringData();
        
        setBroughtData(d);
      
      }


      function handleDataClick(e){

        let w;

        if(checksRes.spelling === "true"){
          w = broughtData.english.split("").join(",")
        }else{
          w = broughtData.english;
        }
  
        setText(w)
        speak()
      }

      function handleChecks(res){

        setChecksRes(res)
    
       }

       useEffect(()=>{

        fun = ()=>{

          setI(prev => ++prev);

        }

        setSpeakRepeatedly(fun);

       },[])

       useEffect(()=>{

          if(play){

           timeOut = setTimeout(()=>{
          
          ref.current.dispatchEvent(mouseDownEvent);
          setTimeout(()=>{ref.current.dispatchEvent(mouseUpEvent);clicker="ghost";ref.current.click()},300)

          },space)
          }else{  
          }

       },[i])
  
  
      useEffect(()=>{
  
        let w;
  
        if(checksRes.spelling === "true"){
          w = broughtData.english.split("").join(",")
        }else{
          w = broughtData.english;
        }

        setText(w);


        if(clicker === "ghost"){
          speakRepeatedly()
        }else{
          speak()
        }

        clicker = "user"
  
  
      },[broughtData])
  
  
      useEffect(()=>{
  
        if(play){
          
          speakRepeatedly();
          space = outletContext.voiceOptions[VoiceFields.Delay]*1000;
          // interval = setInterval(()=>{
           
          // ref.current.dispatchEvent(mouseDownEvent);
          // setTimeout(()=>{ref.current.dispatchEvent(mouseUpEvent);ref.current.click()},400)
          // },outletContext.voiceOptions[VoiceOptionFields.Delay]*1000) 
      
          
        }else{
          // clearInterval(interval)
          clearTimeout(timeOut);

        }
  
         return ()=>{clearTimeout(timeOut)}
  
      },[play])


  return (
    <div className='frame'>
        
            <div ref={ref}
            onMouseUp={(e)=>{e.target.classList.remove("pressed")}}
            onMouseDown={(e)=>{e.target.classList.add("pressed")}}
            onClick={handleBringClick} className='bring'>Bring</div>

            <div 
            value={broughtData.english} onClick={handleDataClick} title={broughtData.turkish} className='data'>
              {checksRes.hide === "false" ? broughtData.english : "?"}
             </div>

            <InputGroup
            onOk={handleChecks} autoOk inputs={inputs} inputsVal={inputsVal} />


            <div onClick={handleButtonClick} className='auto'>
                <i className={play ? "bi bi-pause-circle-fill" : "bi bi-play-circle-fill"}></i>
            </div>

            
          </div>
  )
}

export default Frame