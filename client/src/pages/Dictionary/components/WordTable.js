import React, { useEffect, useState } from "react";
import Modal from "../../../utility/Modal";
import InputGroup from "../../../utility/InputGroup";
import { useFetch } from "../../../hooks/useFetch";
import { DictionaryClass, DictionaryFields, Kelime, KelimeFields, WordLevels, WordTypes } from "../../../models";
import { setText, speak } from "../../../speaker";
import Select from "../../../utility/inputs/Select";
import Spinner from "../../../utility/inputs/Spinner";
import { useOutletContext } from "react-router-dom";

const modalInputs = [
  { key: "1",type:"input",inputType: "text", name: KelimeFields.English, label: "English", },
    { key: "2",type:"input",inputType: "text", name: KelimeFields.Turkish, label: "Turkish" },
    { key: "3",type:"input",inputType: "text", name: KelimeFields.Pronounce, label: "Pronounce", },
    {
      key: "4",
      type: "select",
      name: KelimeFields.Type,
      label: "Type",
      options: Object.keys(WordTypes).map(key => {return {value:WordTypes[key],text:key}}),
    },
    {
      key: "5",
      type: "select",
      name: KelimeFields.Level,
      label: "Level",
      options: Object.keys(WordLevels).map(key => {return {value:WordLevels[key],text:key}})
    },
]

const inputs = [
    { key: "1",type:"div",editType:"input", name: KelimeFields.English,sound:true },
    { key: "2",type:"div",editType:"input", name: KelimeFields.Turkish },
    { key: "3",type:"div",editType:"input", name: KelimeFields.Pronounce},
    {
      key: "4",
      type: "div",
      editType:"select",
      name: KelimeFields.Type,
      options: Object.keys(WordTypes).map(key => {return {value:WordTypes[key],text:key}}),
    },
    {
      key: "5",
      type: "div",
      editType:"select",
      name: KelimeFields.Level,
      options: Object.keys(WordLevels).map(key => {return {value:WordLevels[key],text:key}})
    },
    {
      key:"6",type:"div",name:DictionaryFields.ShowDate,
    }
  ];

  const tableHeaders = ["English","Turkish","Pronounce","Type","Level","CreatedAt"];
  
  
const initialAddWordValues = new Kelime("","","",WordTypes.Word,WordLevels.Hard);


function WordTable({filters,pageFilter,setPlace}) {

    const [words, setWorlds] = useState();

    let outletContext = useOutletContext();


    let myFetch = useFetch();

    useEffect(()=>{

        if(filters && pageFilter){
            getWords()
        }
    },[filters,pageFilter])


    async function handleOk(data){
        let res =  await myFetch({method:"post",path:"/word",body:data});
    
        if(!res.error){
          getWords();
        }else{
          console.log(res.error);
        }
      }

      async function handleDelete(id){

        const confirmation = window.confirm("Are You Sure Safacım?");

        if (!confirmation) return;

        let res = await myFetch({method:"delete",path:`/word/${id}`})

        if(!res.error){
          getWords()
        }else{
          console.log(res.error);
        }
      
  }

  async function handleSave(id){

    
        let updated = words.find(
          (i) => i[DictionaryFields.Id] == id
        );

        let body = new Kelime();
        body.copyToThis(updated);

       let res =await myFetch({method:"put",path:"/word",body:body})

       if(!res.error){

        inputs.forEach(input => {if(input.type){input.type="div"}})

        getWords();

       }else{
        console.log(res.error);
       }

  }

  function handleEdit(id){

    inputs.forEach(input => {if(input.editType){input.type=input.editType}})


        setWorlds((prev) => {
          return prev.map((i) => {
            if (i[DictionaryFields.Id] == id) 
                i[DictionaryFields.Editable] = "true";

            return i;
          });
        });
      
  }

  function handleWordClick(text){

      setText(text);
      speak()

  }

  function handleInputChange(e,id) {

    let target = e.target;

      setWorlds((prev) => {

        return prev.map((i) => {
          if (i[DictionaryFields.Id] == id) {
            if (i[DictionaryFields.Editable] === "true")
              i[target.name] = target.value;
          }

          return i;
        });
      });
    
  }

    

  async function getWords(){
    let words =await myFetch({method:"get",path:"/word/filter",queryParams:{...filters,...pageFilter}})
    
  

    if(!words.error){

      setWorlds(() => {
        return words.success.data.map((word) => {
      
        const originalDate = new Date(word[KelimeFields.CreatedAt]);
        const formattedDate = originalDate.toISOString().split('T')[0];

        word[DictionaryFields.ShowDate] = formattedDate;

          let d = new DictionaryClass();
          d.copyToThis({editable:"false",...word})
          return d;
        });
      });

    }else{
      console.log(words.error);
    }
  }

  // useEffect(()=>{

  //   outletContext.setPlace((prev)=>{
  //   return  [...prev,<>
        
  //     </>]
  //   })

  // },[filters,pageFilter])

  useEffect(()=>{

      setPlace(<Modal
        body={<InputGroup resetOnOk={true} onOk={handleOk}
        inputs={modalInputs} 
        inputsVal={initialAddWordValues}  />}
        id={"modalAddWord"}
        title="Add Word"
        trigger={<div  className="fw-bold btn  add-word">Add Word +</div>}
      />)

  },[])


  return !words ? <Spinner /> :  
    
    <table  className="table table-hover table table-striped caption-top">
      
      <thead>
        <tr >
          <th scope="col">#</th>
          {tableHeaders.map((header) => {
            return <th scope="col">{header}</th>;
          })}
        </tr>
      </thead>
      <tbody className="table-group-divider" >
        {words &&
          words.map((word, index) => (
            <tr
              className={`${
                word[DictionaryFields.Editable] === "true" && "table-active"
              }`}
              key={word[DictionaryFields.Id]}
            >
            
              <th scope="row">{index + 1 + pageFilter.skip}</th>

              {inputs.map((field) => {
                if (field.type == "select") {
                  return (
                    <td className="s">
                    <Select
                      onChange={(e) => {
                          handleInputChange(e, word[DictionaryFields.Id]);
                        }}
                      input={field}
                      inputVal={word[field.name]}
                     />
                      
                    </td>
                  );
                } else {

                  if(field.type == "div"){
                   return <td >
                      <div className={field.sound && "sound"} onClick={()=>{
                        if(field.sound && word[DictionaryFields.Editable] == "false"){
                          handleWordClick(word[field.name]);
                        }
                      }}>
                      {word[field.name]}
                      {field.sound && <i style={{fontSize:"23px"}} className="bi bi-volume-down"></i>}
                      </div>
                    </td>
                  }else{
                    return (
                    <td>
                      <textarea
                        onChange={(e) => {
                          handleInputChange(e, word[DictionaryFields.Id]);
                        }}
                        value={word[field.name]}
                        name={field.name}
                      />
                    </td>
                  );
                  }
                }
              })}













              <td>
                {word[DictionaryFields.Editable] === "true" ? (
                  <div
                    className="btn btn-info me-2"
                    onClick={(e) => {
                      handleSave(word[DictionaryFields.Id]);
                    }}
                  >
                    Save
                  </div>
                ) : (
                  <div
                    className="btn btn-success me-2"
                    onClick={(e) => {
                      handleEdit(word[DictionaryFields.Id]);
                    }}
                  >
                    Edit
                  </div>
                )}

                <div
                  onClick={(e) => {
                    handleDelete(word[DictionaryFields.Id]);
                  }}
                  className="btn btn-danger "
                >
                  Delete
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
   
}

export default WordTable;
