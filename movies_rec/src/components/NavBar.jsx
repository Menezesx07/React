import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import {BiCameraMovie, BiSearchAlt2} from "react-icons/bi"

import "./NavBar.css"

const NavBar = () => {

  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(search)

    //se a busca for vazia, não acontece nada
    if(!search) return

    //jogando para a url do filme
    navigate(`/search?q=${search}`)

    //limpando o search
    setSearch("")
  }



  return (
    <nav id="navbar">
        <h2>
            <Link to="/"> <BiCameraMovie/> MoviesRec</Link>
        </h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Busque um filme" onChange={(e) => setSearch(e.target.value)}/>
            <button type="submit"> <BiSearchAlt2/> </button>
        </form>
    </nav>
  )
}

export default NavBar