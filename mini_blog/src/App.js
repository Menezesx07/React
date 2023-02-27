import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';


//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';


//context 
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home/Home';
import About from './pages/About/About'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register'
import CreatePost from './pages/CreatePost/CreatePost';
import DashBoard from './pages/DashBoard/DashBoard';



function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  //se user for unefined, ele atribui valor ao loadingUser
  const loadingUser = user === undefined

  //recebendo o usuario ao carregar a pagina, tanto pode ser depois do 
  //registro, quanto login automatico
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])


  //caso esteja carregando as credenciais, fica nesse loading ai
  if(loadingUser) {
    return <p>Carregando...</p>
  }


  return (
    <div className="App">
        <AuthProvider value={{user}}> {/* equivalente aquele storage do vue do todos por um*/}
          <BrowserRouter>
          <NavBar/>
            <div className="container">
              <Routes>
                {/* Navigate para redirecionar para home, caso o usuario esteja logado ou não */}
                  <Route path='/' element={<Home/>}/>
                  <Route path='/about' element={<About/>}/>
                  <Route path='/login' element={!user ? <Login/>  : <Navigate to="/"/> }/>
                  <Route path='/register' element={!user ? <Register/>  : <Navigate to="/"/> }/>
                  <Route path='/posts/create' element={user ? <CreatePost/>  : <Navigate to="/"/> }/>
                  <Route path='/dashboard' element={user ? <DashBoard/>  : <Navigate to="/"/> }/>
          
              </Routes>
            </div>
            <Footer/>
          </BrowserRouter>
        </AuthProvider>
    </div>
  );
}

export default App;
