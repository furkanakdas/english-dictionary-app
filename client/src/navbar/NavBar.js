import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {  EngLanguages, FilterWordLevels, KelimeFields, Voice, VoiceFields } from '.././models';
import {  setRate, setVoice, turnOffVolume, turnOnVolume } from '../speaker';
import VoiceOption from './VoiceOption';
import FilterOption from './FilterOption';
import { useFetch } from '../hooks/useFetch';
import SearchBox from './SearchBox';


const inputs = [
    {key:1,name:"number",to:"/number",text:"NUMBER",active:"",bg:"color-palette2"},
    {key:2,name:"dictionary",to:"/random",text:"RANDOM",active:"",bg:"color-palette1"},
    {key:3,name:"word",to:"/dictionary",text:"DICTIONARY",active:""}
]

const initialVoiceOptions = new Voice(3,1,EngLanguages.UKMale,"true");

const initialFilterOptions = {}


function NavBar() {



    let location = useLocation();

    let myFetch = useFetch();

    const [voiceOptions,setVoiceOptions] = 
    useState(initialVoiceOptions);
   
   
    const [filterOptions,setFilterOptions] =
     useState(initialFilterOptions);

     const [searchFilter,setSearchFilter] = useState("");




    const [varPlace,setVarPlace] = useState(null)

    const [links,setLinks] = useState(()=>{

      return inputs.map(i => {
          if(location.pathname === i.to)
              i.active = "active"
          else    
              i.active = "";

          return i;
      })


  });

  

    function setPlace(place){
        setVarPlace(place)
    }

  
    function handleVoiceOptions(voice){


      setRate(voice[VoiceFields.Speed]);
      setVoice(voice[VoiceFields.EngLang]);
      
      if(voice[VoiceFields.Volume] === "true"){
        turnOnVolume();
      }else{
        turnOffVolume();
      }

      setVoiceOptions(prev => {
          return voice
        })
    }

    function handleFilterOptions(_filterOptions){
      
      let toBeDeletedKeys = Object.keys(_filterOptions).filter(key => _filterOptions[key] == FilterWordLevels.All);

      toBeDeletedKeys.forEach(key => {delete _filterOptions[key]})


      let whereFilter = {where:_filterOptions}

      setFilterOptions(whereFilter)

    }

    function handleSearch(searchFilter){

      setSearchFilter({like:searchFilter})
    }


    function handleClick(e){

        setLinks(prev => {

            return prev.map(i => {

                if(i.name === e.target.getAttribute("name")){
                    i.active = "active"
                }else{
                    i.active = ""
                }

                return i;
            
            })

        })
    }

  

  return (
    <>
    <nav className="navbar navbar-expand-md bg-dark border-bottom border-body " data-bs-theme="dark">
  <div className="container-fluid">
    <a style={{fontSize:"26px"}} className="navbar-brand me-4" href="#a">Safa_Eng</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
         {links.map(i=>{
            return <li key={i.key} className='nav-item' >
                <Link onClick={handleClick} className={`nav-link ${i.active}`} name={i.name} 
                to={i.to} >{i.text}</Link>
            </li>
         })}
         
          <VoiceOption options={initialVoiceOptions} onOk={handleVoiceOptions} />
          <FilterOption options={initialFilterOptions} onOk={handleFilterOptions} />


      </ul>
      {varPlace}
      <SearchBox
        input={{name:KelimeFields.English}}
        inputVal={""}
        onSearch={handleSearch}  />
    </div>
  </div>
</nav>


<div className={`feed ${ links.find(i=>i.to===location.pathname).bg } `}>

  <Outlet context={{setPlace:setPlace,voiceOptions:voiceOptions,
  filterOptions:filterOptions,searchFilter:searchFilter}} />

</div>


</>
  )
}

export default NavBar
