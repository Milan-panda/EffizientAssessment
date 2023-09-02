import React from 'react'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import MainForm from './components/mainForm'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainForm/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
