import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import InputGroup from '../utility/InputGroup';
import Frame from '../utility/Frame';
import { FilterFields, FilterWordLevels } from '../models';
import { useFetch } from '../hooks/useFetch';


function Random() { 


    let outletContext = useOutletContext();
    let myFetch = useFetch();
    let navigate = useNavigate();

    async function handleBringClick(){


      let randomIndex =  Math.floor(Math.random() * outletContext.wordCount);

      let filter = {...outletContext.filterOptions,...outletContext.searchFilter,limit:1,skip:randomIndex};


     let res =await myFetch({method:"get",path:"/word/filter",queryParams:filter})

      if(!res.error){

      let words = res.success.data;

      return {...words[0]};

    }else{
      console.log(res.error);
    }

    }

    useEffect(()=>{



    },[outletContext.filterOptions,outletContext.searchFilter])


   useEffect(()=>{

    //outletContext.setPlace(<></>)

   },[outletContext.filterOptions,outletContext.searchFilter])


  return (
    <div className='random'>

          <Frame 
          dataAttributes={{onContextMenu:(e)=>{
            e.preventDefault();
            if(true){
              outletContext.setSearchValue(`^${e.target.getAttribute("value")}$`)
              navigate("/dictionary")
            }
            }}}
          onBringData={handleBringClick} />

    </div>
  )
}

export default Random