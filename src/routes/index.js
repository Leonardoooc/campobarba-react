import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home';
import Contato from '../pages/Contato';
import Sobre from '../pages/Sobre';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Dashboard from '../pages/Dashboard';
import Post from '../pages/Post';

import Private from './Private'

function RoutesApp(){
  return(
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/contato" element={ <Contato /> } />
      <Route path="/sobre" element={ <Sobre /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/cadastro" element={ <Cadastro /> } />
      <Route path="/dashboard" element={ <Private><Dashboard /></Private> } />
      <Route path="/post" element={ <Private><Post /></Private> } />
    </Routes>
  )
}

export default RoutesApp;