import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Dictionary from './pages/Dictionary/Dictionary.js';
import Random from './pages/Random.js';
import Number from './pages/Number';
import "./speaker.js"
import NavBar from './navbar/NavBar.js';
import { useEffect, useRef, useState } from 'react';
import Range from './utility/inputs/Range.js';




function App() {
  
  return (
    <div className="app">

      <Routes>
        <Route path="/" element={<Navigate to={"/number"} />} />

        <Route element={<NavBar />}>
          <Route path="/number" element={<Number />} />

          <Route path="/random" element={<Random />} />
          <Route path="/dictionary" element={<Dictionary />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
