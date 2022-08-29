import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useEffect } from "react";


import Header from "./components/Header";

import {
  Produtos,
  Sobre,
  Produto,
  CriarProdutoForm,
  EditarProduto,
  Login,
  Signup,
  Colaboradores,
  CriarColaborador,
  Perfil, Carrinho
} from "./screens"


const Pages = {
  CART: <Carrinho />,
  PROFILE: <Perfil />

}

const App = () => {




  return (
    <BrowserRouter>
      <Header />
      <div className="container-fluid mt-3">
        <Routes>
          <Route path='/' exact element={< Produtos />}></Route>
          <Route path="/produto/add" element={<CriarProdutoForm />} />
          <Route path="/produto/:id" element={<Produto />} />
          <Route path="/produto/:id/edit" element={<EditarProduto />} />


          <Route path='/colaboradores' element={< Colaboradores />}></Route>
          <Route path='/colaboradores/adicionar' element={< CriarColaborador />}></Route>


          <Route path='/sobre' element={< Sobre />}></Route>
          <Route path='/cart' element={Pages.CART} />

          <Route path='/login' element={< Login />}></Route>
          <Route path='/signup' element={< Signup />}></Route>




          <Route path='/perfil' element={Pages.PROFILE} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
