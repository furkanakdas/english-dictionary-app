import React, { useEffect, useState } from "react";
import Modal from "../../../utility/Modal";
import InputGroup from "../../../utility/InputGroup";
import { useFetch } from "../../../hooks/useFetch";
import { DictionaryClass, DictionaryFields, Kelime, KelimeFields, WordLevels, WordTypes } from "../../../models";
import { setText, speak } from "../../../speaker";


const inputs = [
    { key: "1",type:"input",inputType: "text", name: KelimeFields.English, label: "English",sound:true },
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
  ];
  
  
const initialAddWordValues = new Kelime("","","",WordTypes.Word,WordLevels.Easy);


function WordTable({filters}) {

    const [words, setWorlds] = useState();

    let myFetch = useFetch();


    useEffect(()=>{


        if(filters){
            getWords()

        }
        
        



    },[filters])


    async function handleOk(data){
        let res =  await myFetch({method:"post",path:"/word",body:data});
    
        if(!res.error){
          setWorlds((prev) => {
    
            let newKelime = new DictionaryClass();
    
            newKelime.copyToThis({editable:"false",...res.success.data})
    
            prev.push(newKelime);
      
            return [...prev];
          });
        }else{
          console.log(res.error);
        }
      }

      async function handleDelete(id){

        const confirmation = window.confirm("Are You Sure Safacım?");

        if (!confirmation) return;

        let res = await myFetch({method:"delete",path:`/word/${id}`})

        if(!res.error){
          setWorlds((prev) => {
            return prev.filter((i) => i[DictionaryFields.Id] != id);
          });
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

        setWorlds((prev) => {
          
          return prev.map(word => {
            if (word[DictionaryFields.Id] == id){
              word.copyToThis(res.success.data)
              word[DictionaryFields.Editable] = "false";
            }
            return word;
          })

        });

       }else{
        console.log(res.error);
       }

  }

  function handleEdit(id){


        setWorlds((prev) => {
          return prev.map((i) => {
            if (i[DictionaryFields.Id] == id) 
                i[DictionaryFields.Editable] = "true";

            return i;
          });
        });
      
  }

  function handleWordClick(name,text){

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
    let words =await myFetch({method:"get",path:"/word/filter",queryParams:filters})
    
    if(!words.error){

      setWorlds(() => {
        return words.success.data.map((word) => {
          let d = new DictionaryClass();
          d.copyToThis({editable:"false",...word})
          return d;
        });
      });

    }else{
      console.log(words.error);
    }
  }



  return (
    <table className="table table-hover table table-striped caption-top">
      <caption>
        <Modal
          body={<InputGroup resetOnOk={true} onOk={handleOk}
          inputs={inputs} 
          inputsVal={initialAddWordValues}  />}
          id={"modalAddWord"}
          title="Add Word"
          trigger={<div  className="fw-bold btn btn-secondary add-word">Add Word +</div>}
        />
      </caption>

      <thead>
        <tr>
          <th scope="col">#</th>
          {inputs.map((field) => {
            return <th scope="col">{field.label}</th>;
          })}
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {words &&
          words.map((word, index) => (
            <tr
              className={`${
                word[DictionaryFields.Editable] === "true" && "table-active"
              }`}
              key={word[DictionaryFields.Id]}
            >
              <th scope="row">{index + 1 + filters.skip}</th>

              {inputs.map((field) => {
                if (field.type == "select") {
                  return (
                    <td>
                      <select
                        onChange={(e) => {
                          handleInputChange(e, word[DictionaryFields.Id]);
                        }}
                        value={word[field.name]}
                        name={field.name}
                      >
                        {field.options.map((option) => (
                          <option value={option.value}>{option.text}</option>
                        ))}
                      </select>
                    </td>
                  );
                } else {
                  return (
                    <td>
                      <input
                        onClick={() => {
                          if (
                            field.sound &&
                            word[DictionaryFields.Editable] == "false"
                          ) {
                            handleWordClick(field.name, word[field.name]);
                          }
                        }}
                        onChange={(e) => {
                          handleInputChange(e, word[DictionaryFields.Id]);
                        }}
                        value={word[field.name]}
                        name={field.name}
                      />
                    </td>
                  );
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
  );
}

export default WordTable;
