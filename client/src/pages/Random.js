import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import InputGroup from '../utility/InputGroup';
import Frame from '../utility/Frame';
import { FilterFields, FilterWordLevels, KelimeFields } from '../models';
import { useFetch } from '../hooks/useFetch';
import Range from '../utility/inputs/Range';


function Random() { 


    let outletContext = useOutletContext();
    let myFetch = useFetch();
    let navigate = useNavigate();

  const [min,setMin] = useState(1);
  const [max,setMax] = useState(100);
  


  
  const [isMin,setIsMin] = useState(false);

    async function getWordCount(){

      let minMaxFilter = {like:{[KelimeFields.English]:`^[\\w\\W]{${min},${max}}$`}};


      let filter =  {...outletContext.filterOptions,...minMaxFilter};


      let res = await myFetch({path:"/word/filter/count",method:"get",queryParams:filter});
  
      if(!res.error){
          let count = res.success.data;
  
          return count
  
        }else{
        console.log(res.error);
      }
  
    }

    async function handleBringClick(){

      let wordCount = await getWordCount();

      let randomIndex =  Math.floor(Math.random() * wordCount);

      let minMaxFilter = {like:{[KelimeFields.English]:`^[\\w\\W]{${min},${max}}$`}};


      let filter = {...outletContext.filterOptions,limit:1,skip:randomIndex,...minMaxFilter};


     let res =await myFetch({method:"get",path:"/word/filter",queryParams:filter})

      if(!res.error){

      let words = res.success.data;

      return {...words[0]};

    }else{
      console.log(res.error);
    }

    }

   useEffect(()=>{

    outletContext.setPlace(<div className='letter-range' style={{display:"flex",alignItems:"center",width:"500px",gap:"0px"}}>
    <ul style={{width:"150px"}} class="nav nav-underline">
        <li class="nav-item">
          <div onClick={()=>{setIsMin(true);setMin(min)}} className={`nav-link ${isMin && "active"}`} >{`Min:${min}`}</div>
        </li>
        <li class="nav-item ">
          <div onClick={()=>{setIsMin(false);setMax(max)}} className={`nav-link ${!isMin && "active"}`} >{`Max:${max}`}</div>
        </li>
      </ul>
      
      <Range onChange={(e)=>{
      if(isMin){
        if(parseInt(e.target.value) > parseInt(max))
        {
          setMax(e.target.value)
        }
        setMin(e.target.value)
        
      }else{
        if(parseInt(e.target.value) < parseInt(min))
        {
          setMin(e.target.value)
        }
        setMax(e.target.value)
      }
    }}

    input={{min:"1",max:"100"}}
    inputVal={isMin ? min : max}
    scale={false}
    
    /></div>)

   },[max,min,isMin])


  return (
    <div className='random'>

          <Frame 
          dataAttributes={{onContextMenu:(e)=>{
            e.preventDefault();
            if(true){
              // outletContext.setSearchValue(`^${e.target.getAttribute("value")}$`)
              navigate("/dictionary",{state:{findWord:`^${e.target.getAttribute("value")}$`}})
            }
            }}}
          onBringData={handleBringClick} />





      

    </div>
  )
}

export default Random