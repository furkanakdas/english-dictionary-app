import React, { useEffect, useState } from "react";
import { Route, useLocation, useOutletContext } from "react-router-dom";
import Modal from "../../utility/Modal";
import InputGroup from "../../utility/InputGroup";
import { setText, setVoice, speak } from "../../speaker";
import { useFetch } from "../../hooks/useFetch";
import { DictionaryClass, DictionaryFields, Kelime, KelimeFields, WordLevels, WordTypes } from "../../models";
import Pagination from "./components/Pagination";
import WordTable from "./components/WordTable";
import SearchBox from "./components/SearchBox";


const searchBoxInput = {name:KelimeFields.English}
let friendsNum = 5;
const wordPerPage = 100;


function Dictionary() {

  let outletContext = useOutletContext();

  const [pageCount, setPageCount] = useState(0);

  let myFetch = useFetch();

  let location = useLocation();
  

  const [filters,setFilters] = useState(
    {like:{[KelimeFields.English]:(location.state && location.state.findWord) ? location.state.findWord : ""}
    ,...outletContext.filterOptions}
    );

  const [pageFilter,setPageFilter] = useState({skip:0,limit:wordPerPage})

  const [currPage, setCurrPage] = useState(0);

  const [searchVal,setSearchValue] = useState(filters.like.english)

  const [place,_setPlace] = useState(null); 


  function setPlace(_place){
    _setPlace(_place)
  }
  

  async function getWordCount(){


    let res = await myFetch(
      {path:"/word/filter/count",method:"get",queryParams:filters});

    if(!res.error){
        let count = res.success.data;

        return count;

      }else{
      console.log(res.error);
    }

  }

  

  useEffect(() => {

      getWordCount().then(wordCount=>{

        setPageCount(Math.ceil(wordCount / wordPerPage));

      if (wordCount > 0) {

        if(currPage != 1){
          setCurrPage(1)
        }

      }else {
        setCurrPage(0)
      };

    });

  }, [
    filters
  ]);

  
  useEffect(()=>{

    setFilters(prev => {
      return {...prev,...outletContext.filterOptions};
    });
  },[outletContext.filterOptions])

  
  function handlePageChange(currentPage){
    setCurrPage(currentPage);

    setPageFilter(prev => {
      return {limit:wordPerPage,skip:(currentPage - 1) * wordPerPage};
    });

  }

  function handleSearch(searchObject){


    setFilters(prev => {
      let o ={...prev,like:searchObject};

      return o;
    });
  }

  useEffect(() => {
    outletContext.setPlace((prev)=>{

      return <>
        {place}
        <SearchBox
        input={searchBoxInput}
        inputVal={searchVal}
        onSearch={handleSearch}  />
      </>
    }
      
    );
  }, [searchVal,place]);

  return (
    <div style={{paddingBottom:"15px"}}>

    
      <WordTable setPlace={setPlace}  filters={filters} pageFilter={pageFilter} />

      <Pagination onPageChange={handlePageChange} pageCount={pageCount} currPage={currPage}
       wordPerPage={wordPerPage} friendsNum={friendsNum} />

      
    </div>
  );
}

const a={}

export default Dictionary;
