import React, { useEffect, useState } from "react";
import { Route, useOutletContext } from "react-router-dom";
import Modal from "../../utility/Modal";
import SearchBox from "./components/SearchBox";
import InputGroup from "../../utility/InputGroup";
import { setText, setVoice, speak } from "../../speaker";
import { useFetch } from "../../hooks/useFetch";
import { DictionaryClass, DictionaryFields, Kelime, KelimeFields, WordLevels, WordTypes } from "../../models";
import Pagination from "./components/Pagination";
import WordTable from "./components/WordTable";





function Dictionary() {

  
  let myFetch = useFetch();

  let outletContext = useOutletContext();

  const [searchFilter,setSearchFilter] = useState({});

  const [filters,setFilters] = useState();

  useEffect(() => {


    outletContext.setPlace(
      <>
        
      </>
    );
  }, []);


  function handlePageChange(pageFilter){

    setFilters({...pageFilter,...outletContext.filterOptions,...outletContext.searchFilter});

  }


  return (
    <div>


      <WordTable filters={filters} />

      <Pagination  onPageChange={handlePageChange}   />

      
    </div>
  );
}

const a={}

export default Dictionary;
