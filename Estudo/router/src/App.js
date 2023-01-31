
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';


//pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Info from './pages/Info';
import NotFound from './pages/NotFound';
import SearchForm from './components/SearchForm';
import Search from './pages/Search';


function App() {
  return (
    <div className="App">
        <h1>React-Route</h1>
        
        <BrowserRouter>
        {/* //2 - links com react router*/}
        <Navbar/> {/* tem de ficar dentro do navbar */}

        {/* 9 - search */}
        <SearchForm />

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />

              {/* 4 - rota dinamica  (o router entende que o :id é uma variavel */}
              <Route path='/products/:id' element={<Products />} />
              {/* 6 - nested route */}
              <Route path='/products/:id/info' element={<Info />} />
              {/* 9 - busca */}
              <Route path='/search' element={<Search/>} />
              {/* 10 - redirecionando de um link antigo que foi mudado 
              para o novo (tipo a samsung com o find my device*/}
              <Route path='/company' element={<Navigate to={"/about"}/>} />
              {/* 7 - rota não encontrada */}
              <Route path='*' element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
