import React, { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { useOutletContext } from "react-router-dom";

let friendsNum = 5;
const wordPerPage = 50;

function Pagination({ onPageChange }) {
  let myFetch = useFetch();
  let outletContext = useOutletContext();
  const [currPage, setCurrPage] = useState(0);
  const [pages, setPages] = useState(() => []);
  const [pageCount, setPageCount] = useState(0);
  
  function createArray() {
    let array = [];
    console.log(pageCount + "2");

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

    return array;
  }

  useEffect(() => {
    let array = createArray();
    setPages(array);

    if (currPage > 0) {
      let filter = {
        ...{ skip: (currPage - 1) * wordPerPage, limit: wordPerPage },
      };

      onPageChange(filter);
    }
  }, [currPage, pageCount]);

  useEffect(() => {

    setPageCount(Math.ceil(outletContext.wordCount / wordPerPage));

    if (outletContext.wordCount > 0) {

      if(currPage != 1){
        setCurrPage(1)
      }else{
        let filter = {
          ...{ skip: 0, limit: wordPerPage },
        };
        onPageChange(filter)
      }


    }else {
      setCurrPage(0)
    };



  }, [
    outletContext.wordCount,
    outletContext.filterOptions,
    outletContext.searchFilter,
  ]);


  return (
    <nav aria-label="...">
      <ul className="pagination d-flex">
        <li style={{ flex: 1 }} className="page-item ">
          <a
            onClick={() => {
              setCurrPage(currPage - 1);
            }}
            className={`fw-bold text-center page-link ${
              currPage <= 1 && "disabled"
            } `}
            href="#"
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
                    setCurrPage(i + 1);
                  }}
                  href="#"
                >
                  {i + 1}
                </a>
              </li>
            );
          } else if (page == ".") {
            return (
              <div
                style={{ fontSize: "19px", fontWeight: "bold", color: "blue" }}
              >
                ...............
              </div>
            );
          }
        })}

        <li style={{ flex: 1 }} className="page-item">
          <a
            onClick={() => {
              setCurrPage(currPage + 1);
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
  );
}

export default Pagination;
