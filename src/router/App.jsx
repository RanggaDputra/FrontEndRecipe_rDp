import { useState } from 'react'
import { Navigate,Routes,Router,BrowserRouter,Route,Link,useParams } from 'react-router-dom'
import Menu from '../pages/Menu'
import InputMenu from '../pages/InputMenu'
import UpdateMenu from '../pages/UpdateMenu'
import DetailMenu from '../pages/menuById'
import Login from '../pages/Auth/Login'
import AuthChecker from '../components/AuthChecker'
import Register from '../pages/Auth/Register'
import Profil from '../pages/Profil'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/menu" replace={true}/>}/>
        <Route path='/menu' element={<AuthChecker><Menu/></AuthChecker>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/update-menu/:menuId' element={<UpdateMenu />}/>
        <Route path='/users/login' element={<Profil />}/>
        <Route path='/profil/:menuId' element={<Profil />}/>
        <Route path='/menu-detail/:menuId' element={<DetailMenu />}/>
        <Route path='/inputmenu' element={<InputMenu />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
