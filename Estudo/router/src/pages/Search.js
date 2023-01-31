import { useSearchParams, Link } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"


const Search = () => {

    let [searchParams] = useSearchParams()

    //o JsonServer tem uma função que se passar a url assim, ele retorna o item
    //relacionado a busca, sem precisar fazer o metodo Get
    const url = "http://localhost:3000/products?" + searchParams

    const {data: items, loading, error} = useFetch(url)


  return (
    <div>
        <h1>Resultado Disponiveis</h1>
        <ul className="products">
            {items && items.map(item => (
              <li key={item.id}>
                  <h2>{item.name}</h2>
                  <p>R$: {item.price}</p>
                  <Link to={`/products/${item.id}`}>Detalhes</Link>
              </li>
            ))}
        </ul>
    </div>
  )
}

export default Search