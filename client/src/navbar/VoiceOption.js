import React from 'react'
import Modal from '../utility/Modal'
import InputGroup from '../utility/InputGroup'
import { EngLanguages, VoiceFields } from '../models'


let inputs = [
  {key:"1",type:"input",inputType:"number",name:VoiceFields.Delay,label:"Delay"},
  {key:"2",type:"input",inputType:"number",name:VoiceFields.Speed,label:"Speed"},
  {key:"3",type:"select",name:VoiceFields.EngLang,label:"Speaker(eng)",
  options:[
    {value:EngLanguages.UKFemale,text:EngLanguages.UKFemale},
    {value:EngLanguages.UKMale,text:EngLanguages.UKMale},
    {value:EngLanguages.USFemale,text:EngLanguages.USFemale},
  ]},
  {key:"0",type:"iconCheck",name:VoiceFields.Volume,onTrue:"bi bi-volume-up-fill",onFalse:"bi bi-volume-mute-fill"},

]

function VoiceOption({onOk,options}) {

  return (
    <Modal 
         className={"modalVoiceOptions"}
         id={"modalVoiceOptions"}
         title='Voice Options' 
         body={
         <InputGroup autoOk={true} onOk={(opts) => {onOk(opts)}}
          inputsVal={options}
          inputs={inputs} />
         } 
         trigger={
            <li style={{marginLeft:"50px"}} className='nav-item point'>
            <i style={{fontSize:"19px"}} className="bi bi-mic-fill nav-link"></i>
         </li>
         } />
  )
}

export default VoiceOption