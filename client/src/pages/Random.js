import React, { useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import InputGroup from '../utility/InputGroup';
import Frame from '../utility/Frame';
import { FilterFields, FilterWordLevels } from '../models';
import { useFetch } from '../hooks/useFetch';


function Random() { 


    let outletContext = useOutletContext();
    let myFetch = useFetch();

    async function handleBringClick(){

      let filter = {where:JSON.stringify(outletContext.filterOptions)}


     let res =await myFetch({method:"get",path:"/word",queryParams:filter})

    if(!res.error){

      let words = res.success.data;


      let randomIndex =  Math.floor(Math.random() * words.length);

      return {...words[randomIndex]};

    }else{
      console.log(res.error);
    }



      

     
      
    }

   useEffect(()=>{

    outletContext.setPlace(<></>)

   },[])


  return (
    <div className='random'>

          <Frame onBringData={handleBringClick} />

    </div>
  )
}

export default Random