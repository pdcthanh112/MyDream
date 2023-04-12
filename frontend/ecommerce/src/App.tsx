import { useState, Suspense } from 'react'
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css'
import { MainLayout } from './pages/Layout/MainLayout';

function App() {
  

  return (
    <HashRouter>
    <Suspense fallback={<ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' />}>
      <Routes>
        <Route exact path="*" element={currentUser?.employee ? <MainLayout/> : <Navigate to="/login" />}/>
        <Route exact path="/login" name="Login Page" element={<Login />} />
        <Route exact path="/404" name="Page 404" element={<Page404 />} />
        <Route exact path="/500" name="Page 500" element={<Page500 />} />
      </Routes>
    </Suspense>
  </HashRouter>
  )
}

export default App
