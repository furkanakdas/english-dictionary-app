


// export const url =  "";

export const url =  "http://localhost:3001";


// let requestOwners = []

export function useFetch(){


    async function myfetch({method="get",body=undefined,path="",queryParams}){

        try{

            let fullUrl = url + path;
            
            if(queryParams){

                Object.keys(queryParams).forEach((key,index)=>{

                    if(typeof queryParams[key] == "object"){
                        queryParams[key] = JSON.stringify(queryParams[key])
                    }

                })
                
                Object.keys(queryParams).forEach((key,index) =>{
                    if(index == 0)
                    {fullUrl += "?";}

                    fullUrl+=key + "=" + queryParams[key];

                    fullUrl+="&";
                })

                fullUrl.slice(0,-1);

                console.log(fullUrl);

                // fullUrl = new URL(url + path);

                // fullUrl.search = new URLSearchParams(queryParams).toString();
            }


            body = JSON.stringify(body)


            const response = await fetch(fullUrl, {
                method: method,
                headers:{
                    "Content-Type":"application/json"
                },
                body: body,
                // credentials:"include"
              });    


            let r = await response.json();

            return  r;
    
        }catch(e){
            console.log(e)
        }
    }


    

    return myfetch;

}