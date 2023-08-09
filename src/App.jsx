import { useState } from 'react'
import { Navigate,Routes,Router,BrowserRouter,Route,Link,useParams } from 'react-router-dom'
import Menu from './pages/Menu'
import InputMenu from './pages/InputMenu'
import UpdateMenu from './pages/UpdateMenu'
import DetailMenu from './pages/menuById'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/menu" replace={true}/>}/>
        <Route path='/menu' element={<Menu />}/>
        <Route path='/update-menu/:menuId' element={<UpdateMenu />}/>
        <Route path='/menu-detail/:menuId' element={<DetailMenu />}/>
        <Route path='/inputmenu' element={<InputMenu />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
