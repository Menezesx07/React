import { NavLink } from "react-router-dom"
import styles from "./NavBar.module.css"

import { useAuthentication } from "../hooks/useAuthentication"

import { useAuthValue } from "../context/AuthContext"

const NavBar = () => {

    //pegando o usuario do context (login automatico ou manual que fica no "store")
    const {user} = useAuthValue();

    const {logout} = useAuthentication()




  return <nav className={styles.navbar}>
     <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
     </NavLink>
     <ul className={styles.links_list}>
        <li>
            <NavLink to="/" className={({isActive}) => (isActive ? styles.active : "")}> Home </NavLink>
        </li>

        {/* se tiver algum usuario no user do context, ele desabilita esses dois botoões*/}
        {!user && (
            <>
              <li>
            <NavLink to="/Login" className={({isActive}) => (isActive ? styles.active : "")}> Entrar </NavLink>
        </li>
        <li>
            <NavLink to="/Register" className={({isActive}) => (isActive ? styles.active : "")}> Registrar </NavLink>
        </li>
        </>
        )}
        {user && (
            <>
            <li>
                <NavLink to="/posts/create" className={({isActive}) => (isActive ? styles.active : "")}> Novo Post </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard" className={({isActive}) => (isActive ? styles.active : "")}> Dashboard </NavLink>
            </li>
            </>
        )}
        <li>
            <NavLink to="/about" className={({isActive}) => (isActive ? styles.active : "")}> Sobre </NavLink>
        </li>
        {user && (
             <li>
                <button onClick={logout}>Sair</button>
            </li>
        )}
     </ul>
  </nav>
}

export default NavBar