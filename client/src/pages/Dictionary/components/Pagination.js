import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";



function Pagination({ onPageChange,pageCount,friendsNum,wordPerPage,currPage }) {

    const [pages, setPages] = useState(() => []);

    //const [currPage, setCurrPage] = useState(currentPage);

    useEffect(() => {
        let array = [];

        for (let i = 0; i < pageCount; i++) {
          let element = ".";
    
          if (i == 0) element = "li";
    
          if (i == pageCount - 1) element = "li";
    
          if (i + 1 >= currPage - friendsNum && i + 1 <= currPage + friendsNum)
            element = "li";
    
          if (element == ".") {
            if (array[i - 1] == "." || array[i - 1] == "empty") element = "empty";
          }

          array.push(element);
        }

            
        setPages(array)
    
      },[currPage,pageCount]) 
  

return (
    <nav>
      <ul className="pagination" >
        <li style={{ flex: 1 }} className="page-item ">
          <a
            onClick={() => {
              //setCurrPage(currPage - 1);
              onPageChange(currPage-1)
            }}
            className={`fw-bold text-center page-link ${
              currPage <= 1 && "disabled"
            } `}
            
          >
            Previous
          </a>
        </li>

        {pages.map((page, i) => {
          if (page == "li") {
            return (
              <li style={{ flex: 1 }} className="page-item">
                <a
                  className={`text-center page-link ${
                    i + 1 == currPage && "active"
                  }`}
                  onClick={() => {
                    // setCurrPage(i + 1);
                    onPageChange(i + 1);
                  }}
                  href="#"
                >
                  {i + 1}
                </a>
              </li>
            );
          } else if (page == ".") {
            return (
              <li style={{ flex: 1 }} className="page-item">
                <a
                  className={`text-center page-link fw-bold fs-4`}
                  onClick={() => {}}
                  href="#"
                >
                  ............
                </a>
              </li>
            );
          }
        })}

        <li style={{ flex: 1 }} className="page-item">
          <a
            onClick={() => {
            //   setCurrPage(currPage + 1);
            onPageChange(currPage+1)

            }}
            className={`fw-bold text-center page-link ${
              currPage >= pages.length && "disabled"
            } `}
            href="#"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
)
  
}

export default Pagination;
