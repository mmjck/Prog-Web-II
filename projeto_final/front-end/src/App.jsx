import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store';
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
  Perfil,
  Carrinho,
  AddressCart
} from "./screens"


const Pages = {
  CART: <Carrinho />,
  CART_ADDRESS: <AddressCart />,
  PROFILE: <Perfil />,
  ABOUT: <Sobre />,
  HOME: < Produtos />

}



const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div className="container-fluid mt-3">
          <Routes>
            <Route path='/' exact element={Pages.HOME} ></Route>
            <Route path="/produto/add" element={<CriarProdutoForm />} />
            <Route path="/produto/:id" element={<Produto />} />
            <Route path="/produto/:id/edit" element={<EditarProduto />} />


            <Route path='/colaboradores' element={< Colaboradores />}></Route>
            <Route path='/colaboradores/adicionar' element={< CriarColaborador />}></Route>


            <Route path='/sobre' element={Pages.ABOUT} ></Route>
            <Route path='/cart' element={Pages.CART} />
            <Route path='/cart/address' element={Pages.CART_ADDRESS} />


            <Route path='/login' element={< Login />}></Route>
            <Route path='/signup' element={< Signup />}></Route>


            <Route path='/perfil' element={Pages.PROFILE} />
          </Routes>
        </div>
      </BrowserRouter >
    </Provider>
  );
}

export default App;
