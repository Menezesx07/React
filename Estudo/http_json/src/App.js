
import './App.css';

import { useState, useEffect } from 'react';

//4 - custom hook
import { useFetch } from './hooks/useFetch';

function App() {

  //url do back end 
  const url = "http://localhost:3000/products";

  //recebe os dados do back, products é usado como item lá em baixo
  const [products, setProducts] = useState([])

  //4 - custom hook - é a função do "1 - resgatando dados"
  /*componentizando um hook, nesse caso, o {data} é o retorno dele, 
  o useFetch é o nome da função, e a url é passada como parametro, 
  essa url tá declarada um pouco mais abaixo, já o httpCOnfig, 
  é o corpo do json, que só foi criado para economizar linhas*/
  const {data: items, httpConfig, loading, error} = useFetch(url)



  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

 

    // 1 - resgatando dados

   //não precisa dizer que é uma função async
   //use effect vai monitorar e da reloado no componente, sem precisar da reload na pagina toda

   /*
   useEffect(() => {
     
    async function fechtData() { //fechData é só o nome da função

      const res = await fetch(url);

      const data = await res.json();

      setProducts(data)

    }

    fechtData();

   }, []); */

   //2 - adicionando produtos
   const handleSubmit = async (e) => {
      e.preventDefault();
      
      
      //anotação #002

      //ex: resumido
      const product = { 
        name,
        price
      }
    /*  
      //ex: completo
      const product1 = {
        name: name,
        price: price
      } */

      //5 - refatorando o `POST
      httpConfig(product, "POST")

      //metodo post antigo(bruto) -------------------------------------------------------
      //jogando pro hook com o httpConfig
    /*   const res = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product) //product é o arquivo capturado do campo
      }); */


      //3 - carregamento dinamico
      
      //fazendo o metodo GET
     // const addedProduct = await res.json();

      /*prevProducts é um nome generico para indicar o "products" (setState lá em cima)
      nesse caso, ele tá capturando o array "antigo" com o ...prevProducts, que é um array de
      dados que veio do back-end, e adicionando o item que foi enviado ao back-end no metodo post
      (addedProduct) que é o "res", nesse caso, o res foi criado, e é todo o conteudo que foi enviado pelo metodo post, ao back end, e conseguimos capturar o resultado, usando o res.JSON, que vai capturar apenas
      o json do objeto enviado, que nesse caso, é o {"name", "price"} (addedProduct tá logo acima, recebend 
      o res.JSON do fetch no metodo POST), nesse caso, o componente não carrega completamente, ele só adiciona o ultimo item que foi enviado, consumindo menos processamento, não tem como dar erro
      pois ele só é adicionado na lista, se a requisição para o servidor der status 200, caso não (servidor
      desligado por exemplo, ele não é adicionado a lista) */
     // setProducts((prevProducts) => [...prevProducts, addedProduct]) 

      //resetando os campos
      setName("");
      setPrice("");

   }

   //8 - desafio 6

   const handleRemove = (id) => {
    
    httpConfig(id, "DELETE")
  
   }


  return (
    <div className="App">
        <h1>Rest_Json</h1>

        {/* 6 - loading*/}
        {loading && <p>Carregando dados...</p>} {/* se loading for true*/}
        {error && <p>{error}</p>}
        {!loading && (
          <ul>
              {/*anotação em baixo #001*/}
              {items && items.map((product) => (
                <li key={product.id}> {product.name} - R$: {product.price}
                 - <button onClick={() => handleRemove(product.id)}>X</button></li>
              ))}
          </ul>
        )}
        

        <div className="add-product">
              <form onSubmit={handleSubmit}>
                 <label>
                    Nome:                                           
                    <input type="text" 
                    value={name} 
                    name="name" 
                    onChange={(e) => setName(e.target.value)}/> {/* e.target.value captura o campo */}
                 </label>
                 
                 <label>
                    Preço:                                         
                    <input type="number"
                    value={price} 
                    name="price" 
                    onChange={(e) => setPrice(e.target.value)}/> {/* e.target.value captura o campo */}
                 </label>

                {!loading && <input type='submit' value="Criar"/>}
                 
              </form>
        </div>
    </div>
  );
}

export default App;



/* #001 - items, é o retorno do data que é recebido da função useHooks, && é um if, dizendo que 
se ele for verdadeiro, é imprimido, tem de fazer isso, pq não tem como da um await no html, 
já esse products, que é passado como parametro do item.map((product)) é o objeto, que foi criado,
que recebe o Name e Price, para ser enviado via JSON (é o nome do pacotinho nesse caso)
e o "nomes" é só um nome generico, e a key, é o :key do vue*/


/* #002 - transformando o objeto em json, normalmente se utiliza "name: name" e por ai vai,
porem, se o nome do objeto, for igual ao da variavel, como ex: "name: name", não precisa
colocar desse jeito, da para simplificar apenas colocando "name", no caso, "name", é o nome 
do objeto no useState */