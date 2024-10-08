import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/Notestate';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import React, { useState } from 'react';
function App() {

  const [alert, setalert]= useState(null);

  function takeAlert( message, type){  
    setalert({
      msg:message,
      type:type
    });
    setTimeout(()=>{
      setalert(null);
    },2000);
  }

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className='container'>
            <Routes>
              <Route exact path="/home" element={<Home takeAlert={takeAlert}/>} />
              <Route exact path="/about" element={<About takeAlert={takeAlert}/>} />
              <Route exact path="/login" element={<Login takeAlert={takeAlert}/>} />
              <Route exact path="/signup" element={<Signup takeAlert={takeAlert}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
