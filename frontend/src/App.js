import React from 'react'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import Glowna from './Glowna'
import Cennik from './Cennik'
import Navi from './Navi'
import AdminPanel from './AdminPanel'




function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/glowna' element={<Glowna/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/cennik' element={<Cennik/>}></Route>
          <Route path='/adminpanel' element={<AdminPanel/>}></Route>
          <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;