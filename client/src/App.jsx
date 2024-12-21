import { useState } from 'react'
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/home";
import AddStudent from "../src/pages/addStudent";
import UpdateStudent from "../src/pages/updateStudent";
import DeleteStudent from "../src/pages/deleteStudent";
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Toaster  position="top-center"/>
      <Routes>
        <Route path='/' element={<Home />} />


        <Route path='/addstudent' element={<AddStudent />} />


        <Route path='/updatestudent/:id' element={<UpdateStudent />} />
        <Route path='/updatestudent/' element={<UpdateStudent />} />


        <Route path='/deletestudent/' element={<DeleteStudent />} />
      </Routes>
    </>
  )
}

export default App
