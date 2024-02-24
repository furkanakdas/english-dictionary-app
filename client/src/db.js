



export let datas =  [
    {id:1,english:"meat",turkish:"et",pronounce:"mit",type:"word",level:"easy"},
    {id:2,english:"carpet",turkish:"halı",pronounce:"karpit",type:"expression",level:"hard"},
    {id:3,english:"call off",turkish:"et",pronounce:"kol of",type:"word",level:"hard"},
    {id:4,english:"sun",turkish:"güneş",pronounce:"san",type:"word",level:"medium"},
    {id:5,english:"window",turkish:"pencere",pronounce:"vindox",type:"expression",level:"hard"},
    {id:6,english:"come back",turkish:"geri gel",pronounce:"kam bek",type:"word",level:"easy"},
  

]

// export function getWords(filters=[]){


//     if(filters.length==0)
//         return datas;

//     return datas.filter(data =>{

//         let bool = true;

//         filters.forEach(f=>{
//             if(data[f.where] != f.value){
//                 bool=false
//             }

//         })

//         return bool

//     })

// }

// export function insertData(body){

//     let id = datas[datas.length - 1].id + 1;

//     body.id = id;

//     datas.push(body);

//     return id;

// }

// export function deleteData(id){

//     datas = datas.filter(i => i.id != id)

// }

// export function updateData(d){


//     datas = datas.map(i => {

//         if(i.id == d.id){
//             i = {...d}
//         }

//         return i;
//     })


// }