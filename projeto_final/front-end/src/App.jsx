import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Produtos, Sobre } from "./screens"

import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container-fluid mt-3">
        <Routes>
          <Route path='/' exact component={Produtos}></Route>
          <Route path='/sobre' component={Sobre}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
