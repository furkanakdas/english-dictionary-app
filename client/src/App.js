import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Dictionary from './pages/Dictionary/Dictionary.js';
import Random from './pages/Random.js';
import Number from './pages/Number';
import "./speaker.js"
import NavBar from './navbar/NavBar.js';
import { useEffect, useRef, useState } from 'react';
import DicRan from './pages/DicRan.js';




function App() {

  const [a,b] = useState();
  const [c,d] = useState();
  const [e,f] = useState();

  // useEffect(()=>{
  //   alert("1")

  //   f(33);
  //   f(44);
  //   d(2);
  // },[a])

  // useEffect(()=>{
  //   alert("2")

  // },[c])

  // useEffect(()=>{
  //   alert(e)
  // },[e])

  let location = useLocation();

 
 
  return (
    <div className="app">    


         <Routes>
         
          <Route path='/' element={<Navigate to={"/number"} />} />

          <Route element={<NavBar />} >

            <Route path='/number' element={<Number />} />

            <Route element={<DicRan />}>
              <Route path='/random' element={<Random />} />
              <Route path='/dictionary' element={<Dictionary />} />
            </Route>
            

          </Route>


        </Routes> 


   </div>
  );
}

export default App;
