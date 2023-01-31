import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Search from './pages/Search';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">

        <BrowserRouter>

        <Navbar/>

            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/search" element={<Search/>} />
            </Routes>

            
        </BrowserRouter>
    </div>
  );
}

export default App;
