import { Link, useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch";


const Products = () => {

  //4 - rotas dinamicas
  //recebendo o id como parametro com o :id no link 
  const {id} = useParams();

  //5 - carregamento daod individual 
  //fazendo a mesma coisa da home, só que concatenando o id
  const url = "http://localhost:3000/products/" + id

  const {data: product, loading, error} = useFetch(url)

  console.log(product)

  return <><p> ID do Produto: {id} </p>
    {error && <p>OCorreu um erro...</p>}
    {loading && <p>Carregando...</p>}
    {product && (
      <div>
        <h1>{product.name}</h1>
        <h1>{product.price}</h1>
        {/* 6 - nested router */  }
        <Link to={`/products/${product.id}/info`} >Mais Informações</Link>
      </div>
    )}
  </>

}

export default Products