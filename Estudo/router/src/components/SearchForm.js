
//useNavigate tem a mesma função do Link to, porém, ele é usado em funções
//visto que o link to é um botão fixo, de forma direta, o navigate,
//pode ser trabalhado, para conctenar uma variavel ao link por exemplo,
//chamar a pagina, e carregar o item especifico do bd, com o metodo GET
import { useNavigate } from "react-router-dom"


import { useState } from "react"

const SearchForm = () => {

    //criando uma variavel para usar o useNavigate
    const navigate = useNavigate()

    //variavel que vai ser indexada ao link
    const [query, setQuery] = useState()

    //função que vai ser usada no input ali em baixo
    //que vai capturar o evento (texto com o e.target.value) 
    //vai setar o query (isso tudo no input)
    //a função em si, vai concatenar a variavel com o linl
    const handleSubmit = (e) => {
        e.preventDefault();
        
        navigate('/search?q=' + query)

    }


  return <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setQuery(e.target.value)}/>
      <input type="submit" value="Bucar" />
  </form>
}

export default SearchForm