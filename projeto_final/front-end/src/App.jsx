import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Produtos, Sobre, Produto, CriarProdutoForm, EditarProduto, Login } from "./screens"

import Header from "./components/Header";
import { useSelector } from "react-redux";
import { useEffect } from "react";

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

          <Route path='/sobre' element={< Sobre />}></Route>
          <Route path='/cart' element={< Sobre />}></Route>

          <Route path='/login' element={< Login />}></Route>
          <Route path='/signup).' element={< Sobre />}></Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
