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
  Perfil
} from "./screens"

const App = () => {

  const user = useSelector((state) => state.userData);


  useEffect(() => {
    console.log(user);
  }, [user])


  console.log(`asasd`);

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
          <Route path='/cart' element={< Sobre />}></Route>

          <Route path='/login' element={< Login />}></Route>
          <Route path='/signup' element={< Signup />}></Route>




          <Route path='/perfil' element={< Perfil />}></Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
