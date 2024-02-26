import React, { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { useOutletContext } from "react-router-dom";

let friendsNum = 5;
const wordPerPage = 25;


function Pagination({onPageChange}) {

    let myFetch = useFetch();
    let outletContext = useOutletContext();
    const [currPage,setCurrPage] = useState(0);
    const [pages,setPages] = useState(()=>[]);
    const [pageCount,setPageCount] = useState(0);

  

  useEffect(()=>{


    let array = createArray();

    setPages(array);

    if(currPage > 0){
      let filter = {...{skip:(currPage - 1)*25,limit:wordPerPage}}

      
      onPageChange(filter);
    }


  },[currPage,pageCount])

  useEffect(()=>{

    setPageCount(Math.ceil(outletContext.wordCount / wordPerPage));

    if(outletContext.wordCount > 0)
      setCurrPage(1);
    else
      setCurrPage(0);


  },[outletContext.wordCount,outletContext.filterOptions,outletContext.searchFilter])




  function createArray(){
    let array = [];

    for(let i=0;i<pageCount;i++){

        let element= ".";

        if(i==0)
            element="li";

        if(i==pageCount-1)
             element="li";

        if(i+1 >= currPage -friendsNum && i+1 <=  currPage +friendsNum)
             element="li";

        
        if(element == "."){
            if(array[i-1] == "." || array[i-1] == "empty")
                element = "empty"
        }
        
        array.push(element);
    }

    return array;
  }

  return (
    <nav aria-label="...">
      <ul class="pagination">

        
       <li className="page-item ">
          <a onClick={()=>{setCurrPage(currPage-1)}} className={`page-link ${currPage <= 1 && "disabled"} `} href="#">
            Previous
          </a>
        </li>
        

        {pages.map((page, i) => {
          if (page == "li") {
            return (
              <li  className="page-item">
                <a className={`page-link ${i+1 == currPage && "active"}`}
                 onClick={()=>{setCurrPage(i+1)}} href="#">
                  {i+1}
                </a>
              </li>
            );
          }else if(page == "."){return <div style={{fontSize:"19px",fontWeight:"bold",color:"blue"}}>..........</div>}
    
        })}

         <li className="page-item">
          <a onClick={()=>{setCurrPage(currPage+1)}} 
          className={`page-link ${currPage >= pages.length && "disabled"} `}
          href="#">
            Next
          </a>
        </li>

      </ul>
    </nav>
  );
}

export default Pagination;
