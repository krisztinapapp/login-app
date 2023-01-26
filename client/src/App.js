import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Navigate replace to='/login' />} />
        <Route path='/signup' exact element={<Signup />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/main' exact element={<Main />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;