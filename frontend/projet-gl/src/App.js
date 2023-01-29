import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar'
import Main from './components/Main/Main'
import Home from './Home';
import Annonce from './components/Annonce/Annonce';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddAnnonce from './components/AddAnnonce/AddAnnonce'
import MyProfile from './components/MyProfile/MyProfile'

import { useAuthContext } from './hooks/useAuthContext'
function App() {
  const { user } = useAuthContext()
  return (
    <React.StrictMode>
    <Navbar/>
    <BrowserRouter> 
      <Routes>
        
        <Route path="/login" element={<Main/>} />
        <Route path="/" element={<Home/>}/>
        <Route path="/annonce" element={<Annonce/>}/>
        <Route path="/addannonce" element={<AddAnnonce/>}/>
        <Route path="/myprofile" element={<MyProfile/>}/>
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  );
}

export default App;
