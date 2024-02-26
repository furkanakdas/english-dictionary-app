import React, { useEffect, useState } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch';

function DicRan() {

    let outletContext = useOutletContext();
    let myFetch = useFetch();

    const [wordCount,setWordCount] = useState(0);

    useEffect(()=>{

      getWordCount();

    },[outletContext.filterOptions,outletContext.searchFilter])
    
    async function getWordCount(){

      let filter =  {...outletContext.filterOptions,...outletContext.searchFilter};

      let res = await myFetch({path:"/word/filter/count",method:"get",queryParams:filter});
  
      if(!res.error){
          let count = res.success.data;
  
          setWordCount(prev => count);
  
        }else{
        console.log(res.error);
      }
  
    }

  return (
    <Outlet context={{...outletContext,wordCount:wordCount}} />

  )
}

export default DicRan