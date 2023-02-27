//CSS
import styles from "./Home.modules.css"

//hooks
import { Link, useNavigate} from "react-router-dom"
import { useState } from "react"


//coponents


const Home = () => {

  const [query, setQuery] = useState("")
  const [posts] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="home">
      <h1>Veja os Posts Mais Recentes</h1>
      <form onSubmit={handleSubmit} className="search_form">
        <input type="text" placeholder="Ou Busque por Tags..." onChange={(e) => setQuery(e.target.value)}/>
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        <h1>Posts...</h1>
        {posts && posts.length === 0 && (
          <div className="noposts">
            <p>Não Foram Encontrados Posts</p>
            <Link to="/posts/create" className="btn">Criar Primeiro Post</Link>
          </div>  
        )}
      </div>
    </div>
  )
}

export default Home